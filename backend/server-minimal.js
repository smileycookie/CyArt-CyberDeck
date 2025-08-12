const https = require('https');

// Test OpenSearch connection with admin credentials
async function testOpenSearchConnection() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '100.66.240.63',
      port: 9200,
      path: '/_cluster/health',
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64'),
        'Content-Type': 'application/json'
      },
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('✅ OpenSearch cluster health:', jsonData.status);
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

// Test fetching real Wazuh alerts
async function fetchWazuhAlerts() {
  return new Promise((resolve, reject) => {
    const searchQuery = {
      "query": { "match_all": {} },
      "size": 5,
      "sort": [{ "@timestamp": { "order": "desc" } }]
    };

    const options = {
      hostname: '100.66.240.63',
      port: 9200,
      path: '/wazuh-alerts-4.x-*/_search',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64'),
        'Content-Type': 'application/json'
      },
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData.hits && jsonData.hits.hits) {
            const alerts = jsonData.hits.hits.map((hit, index) => {
              const source = hit._source;
              return {
                id: `real-${hit._id}`,
                timestamp: source['@timestamp'],
                index: hit._index,
                agentId: source.agent?.id || '000',
                agentName: source.agent?.name || 'unknown',
                agentIp: source.agent?.ip || 'unknown',
                ruleId: source.rule?.id || '0000',
                ruleDescription: source.rule?.description || 'Unknown rule',
                ruleLevel: source.rule?.level || 1,
                ruleGroups: source.rule?.groups || [],
                location: source.location || 'unknown',
                managerName: source.manager?.name || 'wazuh-server'
              };
            });
            
            console.log(`✅ Fetched ${alerts.length} real Wazuh alerts:`);
            alerts.forEach((alert, i) => {
              console.log(`${i+1}. [${alert.agentName}] ${alert.ruleDescription} (Level: ${alert.ruleLevel})`);
            });
            resolve(alerts);
          } else {
            reject(new Error('No alerts found'));
          }
        } catch (e) {
          reject(new Error('Invalid JSON response: ' + e.message));
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.write(JSON.stringify(searchQuery));
    req.end();
  });
}

// Run tests
async function runTests() {
  console.log('🔍 Testing OpenSearch connection...\n');
  
  try {
    // Test connection
    await testOpenSearchConnection();
    console.log('');
    
    // Test fetching alerts
    console.log('🔍 Fetching real Wazuh alerts...\n');
    await fetchWazuhAlerts();
    
    console.log('\n✅ All tests passed! OpenSearch connection is working with real data.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();