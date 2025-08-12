import { Client } from '@elastic/elasticsearch';
import { elasticsearchConfig } from '../config/db';

class ElasticsearchService {
  private client: Client;

  constructor() {
    this.client = new Client({
      ...elasticsearchConfig,
      // Disable product check for OpenSearch
      enableMetaHeader: false
    });
  }

  async getLatestAlerts(limit = 50) {
    try {
      const response = await this.client.search({
        index: 'wazuh-alerts-*',
        body: {
          size: limit,
          query: {
            match_all: {}
          },
          _source: [
            'rule.description',
            'rule.id', 
            'rule.level',
            'rule.groups',
            'rule.firedtimes',
            'agent.id',
            'agent.name', 
            'agent.ip',
            '@timestamp',
            'decoder.name',
            'location',
            'manager.name',
            'input.type',
            'full_log',
            '_index'
          ],
          sort: [
            { '@timestamp': { order: 'desc' } }
          ]
        }
      });

      const hits = response.body?.hits?.hits || [];
      console.log(`Found ${hits.length} Wazuh alerts`);
      
      return hits.map((hit: any) => ({
        id: hit._id,
        timestamp: hit._source['@timestamp'],
        index: hit._index,
        agentId: hit._source.agent?.id || 'N/A',
        agentName: hit._source.agent?.name || 'Unknown',
        agentIp: hit._source.agent?.ip || 'N/A',
        ruleId: hit._source.rule?.id || 'N/A',
        ruleDescription: hit._source.rule?.description || 'No description available',
        ruleLevel: hit._source.rule?.level || 0,
        ruleGroups: hit._source.rule?.groups || [],
        ruleFiredtimes: hit._source.rule?.firedtimes || 0,
        decoderName: hit._source.decoder?.name || 'wazuh',
        location: hit._source.location || 'rules',
        managerName: hit._source.manager?.name || 'wazuh-server',
        inputType: hit._source.input?.type || 'log',
        fullLog: hit._source.full_log || 'No log data available'
      }));
    } catch (error) {
      console.error('Error fetching latest alerts:', error.message);
      // Return empty array to trigger fallback
      return [];
    }
  }
}

export default new ElasticsearchService();