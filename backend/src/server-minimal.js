require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const axios = require('axios');
const https = require('https');

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

const io = new Server(server, { cors: { origin: "*" } });

const WAZUH_API = 'https://100.66.240.63:55000';
const auth = { username: 'wazuh-wui', password: 'wazuh-wui' };

let token = null;
let cachedAgents = [];
let cachedLogs = [];
let lastAlertTimestamp = null;

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

async function getToken() {
  try {
    const response = await axiosInstance.post(`${WAZUH_API}/security/user/authenticate`, {}, { auth });
    token = response.data.data.token;
    console.log('Token refreshed');
  } catch (error) {
    console.error('Auth failed:', error.message);
  }
}

async function fetchAllAgents() {
  try {
    if (!token) await getToken();
    const response = await axiosInstance.get(`${WAZUH_API}/agents?pretty=true&limit=1000`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    cachedAgents = response.data.data.affected_items;
    return cachedAgents;
  } catch (error) {
    console.error('Fetch agents failed:', error.message);
    return cachedAgents;
  }
}

async function fetchLogs() {
  try {
    const searchQuery = {
      query: { match_all: {} },
      size: 50,
      sort: [{ '@timestamp': { order: 'desc' } }]
    };

    const response = await axiosInstance.post('https://100.66.240.63:9200/wazuh-alerts-4.x-*/_search', searchQuery, {
      auth: { username: 'admin', password: 'admin' }
    });
    
    const hits = response.data.hits.hits;
    const logs = hits.map(hit => ({
      id: hit._id,
      timestamp: hit._source['@timestamp'],
      level: hit._source.rule?.level >= 7 ? 'HIGH' : 'MEDIUM',
      message: hit._source.rule?.description || 'Security alert',
      agentName: hit._source.agent?.name || 'wazuh-server',
      agentId: hit._source.agent?.id || '000',
      agentIp: hit._source.agent?.ip || 'N/A',
      location: hit._source.location || 'unknown',
      ruleId: hit._source.rule?.id || 'N/A',
      decoder: hit._source.decoder?.name || 'wazuh',
      full_log: hit._source.full_log || '',
      manager: hit._source.manager?.name || 'wazuh-server',
      input_type: hit._source.input?.type || 'log',
      rule_level: hit._source.rule?.level,
      rule_groups: hit._source.rule?.groups || [],
      rule_description: hit._source.rule?.description
    }));
    
    cachedLogs = logs;
    console.log(`✅ Fetched ${logs.length} real OpenSearch alerts`);
    return logs;
  } catch (error) {
    console.error('❌ OpenSearch fetch failed:', error.message);
    return cachedLogs.length > 0 ? cachedLogs : [];
  }
}

async function fetchNewAlerts() {
  try {
    const searchQuery = {
      query: lastAlertTimestamp ? {
        range: {
          '@timestamp': {
            gt: lastAlertTimestamp
          }
        }
      } : { match_all: {} },
      size: 10,
      sort: [{ '@timestamp': { order: 'desc' } }]
    };

    const response = await axiosInstance.post('https://100.66.240.63:9200/wazuh-alerts-4.x-*/_search', searchQuery, {
      auth: { username: 'admin', password: 'admin' }
    });
    
    const hits = response.data.hits.hits;
    if (hits.length > 0) {
      lastAlertTimestamp = hits[0]._source['@timestamp'];
      
      const newAlerts = hits.map(hit => ({
        id: hit._id,
        timestamp: hit._source['@timestamp'],
        level: hit._source.rule?.level >= 7 ? 'HIGH' : 'MEDIUM',
        message: hit._source.rule?.description || 'Security alert',
        agentName: hit._source.agent?.name || 'wazuh-server',
        agentId: hit._source.agent?.id || '000',
        agentIp: hit._source.agent?.ip || 'N/A',
        location: hit._source.location || 'unknown',
        ruleId: hit._source.rule?.id || 'N/A',
        decoder: hit._source.decoder?.name || 'wazuh',
        full_log: hit._source.full_log || '',
        manager: hit._source.manager?.name || 'wazuh-server',
        input_type: hit._source.input?.type || 'log',
        rule_level: hit._source.rule?.level,
        rule_groups: hit._source.rule?.groups || [],
        rule_description: hit._source.rule?.description
      }));
      
      console.log(`🚨 ${newAlerts.length} new real-time alerts detected`);
      return newAlerts;
    }
    
    return [];
  } catch (error) {
    console.error('❌ New alerts fetch failed:', error.message);
    return [];
  }
}

io.on('connection', async (socket) => {
  console.log('🔗 Client connected');
  
  const agents = await fetchAllAgents();
  const logs = await fetchLogs();
  
  // Set initial timestamp
  if (logs.length > 0) {
    lastAlertTimestamp = logs[0].timestamp;
  }
  
  socket.emit('agents:initial', agents);
  socket.emit('logs:initial', logs);
  
  // Check for new alerts every 5 seconds
  const alertInterval = setInterval(async () => {
    const newAlerts = await fetchNewAlerts();
    if (newAlerts.length > 0) {
      console.log(`🚨 ${newAlerts.length} new real-time alerts detected`);
      socket.emit('logs:new', newAlerts);
      
      // Update cached logs with new alerts
      cachedLogs = [...newAlerts, ...cachedLogs].slice(0, 100);
      socket.emit('logs:update', cachedLogs);
    }
  }, 5000);
  
  // Update agents every 30 seconds
  const agentInterval = setInterval(async () => {
    const updatedAgents = await fetchAllAgents();
    socket.emit('agents:update', updatedAgents);
  }, 30000);
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected');
    clearInterval(alertInterval);
    clearInterval(agentInterval);
  });
});

// Essential API endpoints
app.get('/api/elasticsearch/alerts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const logs = await fetchLogs();
    
    const alerts = logs.slice(0, limit).map(log => ({
      id: log.id,
      timestamp: log.timestamp,
      index: `wazuh-alerts-4.x-${new Date(log.timestamp).toISOString().split('T')[0]}`,
      agentId: log.agentId,
      agentName: log.agentName,
      agentIp: log.agentIp,
      ruleId: log.ruleId,
      ruleDescription: log.rule_description || log.message,
      ruleLevel: log.rule_level,
      ruleGroups: log.rule_groups,
      ruleFiredtimes: 1,
      decoderName: log.decoder,
      location: log.location,
      managerName: log.manager,
      inputType: log.input_type,
      fullLog: log.full_log
    }));
    
    console.log(`✅ Served ${alerts.length} real-time alerts via API`);
    res.json({
      success: true,
      data: alerts,
      message: `Retrieved ${alerts.length} real-time security alerts`
    });
  } catch (error) {
    console.error('❌ API alerts fetch failed:', error.message);
    res.json({
      success: false,
      data: [],
      message: 'Failed to fetch real-time alerts'
    });
  }
});

app.post("/api/field-click", (req, res) => {
  const { field, data, timestamp, agentCount } = req.body;
  console.log(`🔍 FIELD CLICKED: ${field.toUpperCase()}`);
  console.log(`⏰ Timestamp: ${timestamp}`);
  console.log(`👥 Agent Count: ${agentCount}`);
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

setInterval(getToken, 14 * 60 * 1000);

server.listen(3000, '0.0.0.0', async () => {
  console.log('🚀 Minimal Wazuh backend running on port 3000');
  console.log('📡 Connected to OpenSearch at 100.66.240.63:9200');
  console.log('🔄 Real-time agent and alert updates enabled');
  await getToken();
});