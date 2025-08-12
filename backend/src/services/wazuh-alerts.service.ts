import https from 'https';

class WazuhAlertsService {
  private baseUrl = 'https://100.66.240.63:55000';
  private opensearchUrl = 'https://100.66.240.63:9200';
  private token: string | null = null;
  private username = 'admin';
  private password = 'admin';

  async authenticate() {
    try {
      // Try OpenSearch first
      const opensearchAuth = await this.testOpenSearchConnection();
      if (opensearchAuth) {
        this.token = 'opensearch-authenticated';
        console.log('✅ OpenSearch authenticated');
        return true;
      }

      // Fallback to Wazuh API
      const response = await this.makeRequest('/security/user/authenticate', 'GET', {
        'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
      });
      
      if (response.data && response.data.token) {
        this.token = response.data.token;
        console.log('✅ Wazuh API authenticated');
        return true;
      }
      return false;
    } catch (error) {
     // console.error('❌ Wazuh API authentication failed:', error.message);
      return false;
    }
  }

  async getRecentAlerts(limit = 50) {
    try {
      if (!this.token) {
        await this.authenticate();
      }

      // Try OpenSearch direct query first
      if (this.token === 'opensearch-authenticated') {
        const opensearchAlerts = await this.getOpenSearchAlerts(limit);
        if (opensearchAlerts.length > 0) {
          return opensearchAlerts;
        }
      }

      // Fallback to Wazuh API
      const response = await this.makeRequest('/events', 'GET', {
        'Authorization': `Bearer ${this.token}`
      });

      if (response.data && response.data.affected_items) {
        const alerts = response.data.affected_items.slice(0, limit).map((event: any, index: number) => ({
          id: `wazuh-${event.id || index}`,
          timestamp: event.timestamp || new Date().toISOString(),
          index: `wazuh-alerts-4.x-${new Date().toISOString().split('T')[0]}`,
          agentId: event.agent_id || '000',
          agentName: event.agent_name || 'wazuh-server',
          agentIp: event.agent_ip || '100.108.179.83',
          ruleId: event.rule_id || '1001',
          ruleDescription: event.rule_description || event.description || 'Wazuh server event',
          ruleLevel: event.rule_level || 2,
          ruleGroups: event.rule_groups || ['wazuh'],
          ruleFiredtimes: event.rule_firedtimes || 1,
          decoderName: event.decoder_name || 'wazuh',
          location: event.location || '/var/log/wazuh.log',
          managerName: 'wazuh-server',
          inputType: 'log',
          fullLog: event.full_log || `[${event.timestamp}] ${event.description || 'Wazuh event'}`
        }));

        console.log(`✅ Fetched ${alerts.length} real Wazuh alerts`);
        return alerts;
      }

      return [];
    } catch (error) {
     // console.error('❌ Failed to fetch Wazuh alerts:', error.message);
      return [];
    }
  }

  private async testOpenSearchConnection(): Promise<boolean> {
    try {
      const response = await this.makeOpenSearchRequest('/_cluster/health', 'GET');
      return response && response.status;
    } catch (error) {
     // console.log('OpenSearch connection test failed:', error.message);
      return false;
    }
  }

  private async getOpenSearchAlerts(limit: number): Promise<any[]> {
    try {
      const searchQuery = {
        "query": { "match_all": {} },
        "size": limit,
        "sort": [{ "@timestamp": { "order": "desc" } }]
      };

      const response = await this.makeOpenSearchRequest('/wazuh-alerts-*/_search', 'POST', searchQuery);
      
      if (response && response.hits && response.hits.hits) {
        const alerts = response.hits.hits.map((hit: any, index: number) => {
          const source = hit._source;
          return {
            id: `opensearch-${hit._id || index}`,
            timestamp: source['@timestamp'] || new Date().toISOString(),
            index: hit._index || `wazuh-alerts-4.x-${new Date().toISOString().split('T')[0]}`,
            agentId: source.agent?.id || '000',
            agentName: source.agent?.name || 'wazuh-server',
            agentIp: source.agent?.ip || '100.66.240.63',
            ruleId: source.rule?.id || '1001',
            ruleDescription: source.rule?.description || 'OpenSearch security event',
            ruleLevel: source.rule?.level || 2,
            ruleGroups: source.rule?.groups || ['opensearch'],
            ruleFiredtimes: source.rule?.firedtimes || 1,
            decoderName: source.decoder?.name || 'opensearch',
            location: source.location || '/var/log/opensearch.log',
            managerName: source.manager?.name || 'wazuh-server',
            inputType: source.input?.type || 'log',
            fullLog: source.full_log || `[${source['@timestamp']}] ${source.rule?.description || 'OpenSearch event'}`
          };
        });
        
        console.log(`✅ Fetched ${alerts.length} real OpenSearch alerts`);
        return alerts;
      }
      
      return [];
    } catch (error) {
     // console.error('❌ Failed to fetch OpenSearch alerts:', error.message);
      return [];
    }
  }

  private makeOpenSearchRequest(endpoint: string, method: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: '100.66.240.63',
        port: 9200,
        path: endpoint,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
        },
        rejectUnauthorized: false
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });

      req.on('error', (error) => reject(error));
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  }

  private makeRequest(endpoint: string, method: string, headers: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: '100.66.240.63',
        port: 55000,
        path: endpoint,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        rejectUnauthorized: false
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });

      req.on('error', (error) => reject(error));
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.end();
    });
  }
}

export default new WazuhAlertsService();