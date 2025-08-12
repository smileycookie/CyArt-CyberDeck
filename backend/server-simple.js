const express = require('express');
const cors = require('cors');
const https = require('https');
const { Server } = require('socket.io');
const http = require('http');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
app.use(cors({ origin: "*" }));
app.use(express.json());

const io = new Server(server, { cors: { origin: "*" } });

const WAZUH_API = 'https://100.66.240.63:55000';
let token = null;
let cachedAgents = [];

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

async function getToken() {
  try {
    const response = await axiosInstance.post(`${WAZUH_API}/security/user/authenticate`, {}, {
      auth: { username: 'wazuh-wui', password: 'wazuh-wui' }
    });
    token = response.data.data.token;
    console.log('✅ Wazuh API token refreshed');
  } catch (error) {
    console.error('❌ Wazuh API auth failed:', error.message);
  }
}

async function fetchAllAgents() {
  try {
    if (!token) await getToken();
    const response = await axiosInstance.get(`${WAZUH_API}/agents?pretty=true&limit=1000`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    cachedAgents = response.data.data.affected_items;
    console.log(`✅ Fetched ${cachedAgents.length} agents from Wazuh API`);
    return cachedAgents;
  } catch (error) {
    console.error('❌ Fetch agents failed:', error.message);
    return cachedAgents;
  }
}

// OpenSearch connection
async function getWazuhAlerts(limit = 50) {
  return new Promise((resolve, reject) => {
    const searchQuery = {
      "query": { "match_all": {} },
      "size": limit,
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
            const alerts = jsonData.hits.hits.map((hit) => {
              const source = hit._source;
              return {
                id: `real-${hit._id}`,
                timestamp: source['@timestamp'],
                index: hit._index,
                agentId: source.agent?.id || '000',
                agentName: source.agent?.name || 'wazuh-server',
                agentIp: source.agent?.ip || 'unknown',
                ruleId: source.rule?.id || '0000',
                ruleDescription: source.rule?.description || 'Unknown rule',
                ruleLevel: source.rule?.level || 1,
                ruleGroups: source.rule?.groups || [],
                ruleFiredtimes: source.rule?.firedtimes || 1,
                decoderName: source.decoder?.name || 'wazuh',
                location: source.location || 'unknown',
                managerName: source.manager?.name || 'wazuh-server',
                inputType: source.input?.type || 'log',
                fullLog: source.full_log || source.data?.win?.system?.message || `Security event from ${source.agent?.name || 'agent'}`
              };
            });
            resolve(alerts);
          } else {
            resolve([]);
          }
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
    
    req.write(JSON.stringify(searchQuery));
    req.end();
  });
}

// API Routes
app.get('/api/elasticsearch/alerts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const alerts = await getWazuhAlerts(limit);
    
    console.log(`✅ Served ${alerts.length} real Wazuh alerts`);
    res.json({
      success: true,
      data: alerts,
      message: `Retrieved ${alerts.length} real security alerts from OpenSearch`
    });
  } catch (error) {
    console.error('❌ Failed to fetch alerts:', error.message);
    res.json({
      success: false,
      data: [],
      message: 'Failed to fetch real alerts, using fallback'
    });
  }
});

app.post('/api/field-click', (req, res) => {
  console.log('📊 Field clicked:', req.body.field);
  res.json({ success: true });
});

app.post("/api/agent/restart", async (req, res) => {
  const { agentId } = req.body;
  try {
    if (!token) await getToken();
    await axiosInstance.put(`${WAZUH_API}/agents/restart`, {
      agents_list: [agentId]
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    res.json({ success: true, message: "Agent restart initiated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Socket.io for real-time data
io.on('connection', async (socket) => {
  console.log('🔗 Client connected to real-time feed');
  
  // Send initial data
  const agents = await fetchAllAgents();
  const alerts = await getWazuhAlerts(50);
  
  socket.emit('agents:initial', agents);
  socket.emit('logs:initial', alerts.map(alert => ({
    id: alert.id,
    timestamp: alert.timestamp,
    level: alert.ruleLevel >= 7 ? 'HIGH' : 'MEDIUM',
    message: alert.ruleDescription,
    agentName: alert.agentName,
    agentId: alert.agentId,
    agentIp: alert.agentIp,
    location: alert.location,
    ruleId: alert.ruleId,
    decoder: alert.decoderName,
    full_log: alert.fullLog,
    manager: alert.managerName,
    input_type: alert.inputType,
    rule_level: alert.ruleLevel,
    rule_groups: alert.ruleGroups,
    rule_description: alert.ruleDescription
  })));
  
  // Update agents every 30 seconds
  const agentInterval = setInterval(async () => {
    const updatedAgents = await fetchAllAgents();
    socket.emit('agents:update', updatedAgents);
  }, 30000);
  
  // Update alerts every 10 seconds
  const alertInterval = setInterval(async () => {
    const newAlerts = await getWazuhAlerts(10);
    if (newAlerts.length > 0) {
      socket.emit('logs:new', newAlerts.map(alert => ({
        id: alert.id,
        timestamp: alert.timestamp,
        level: alert.ruleLevel >= 7 ? 'HIGH' : 'MEDIUM',
        message: alert.ruleDescription,
        agentName: alert.agentName,
        agentId: alert.agentId,
        agentIp: alert.agentIp,
        location: alert.location,
        ruleId: alert.ruleId,
        decoder: alert.decoderName,
        full_log: alert.fullLog,
        manager: alert.managerName,
        input_type: alert.inputType,
        rule_level: alert.ruleLevel,
        rule_groups: alert.ruleGroups,
        rule_description: alert.ruleDescription
      })));
    }
  }, 10000);
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected');
    clearInterval(agentInterval);
    clearInterval(alertInterval);
  });
});

// Initialize token and start server
setInterval(getToken, 14 * 60 * 1000);

const PORT = 3000;
server.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Enhanced Wazuh API server running on port ${PORT}`);
  console.log(`📡 Connected to OpenSearch at 100.66.240.63:9200`);
  console.log(`🔄 Real-time agent and alert updates enabled`);
  await getToken();
});