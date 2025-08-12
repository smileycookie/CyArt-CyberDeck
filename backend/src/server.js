require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const axios = require('axios');
const https = require('https');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "*" }
});

const WAZUH_API = 'https://100.66.240.63:55000';
const auth = { username: 'wazuh-wui', password: 'wazuh-wui' };

// Elasticsearch client for real Wazuh alerts
let esClient = null;

async function initElasticsearch() {
  try {
    esClient = new Client({
      node: 'https://100.66.240.63:9200',
      auth: {
        username: 'admin',
        password: 'admin'
      },
      ssl: {
        rejectUnauthorized: false
      },
      requestTimeout: 10000,
      disablePrototypePoisoningProtection: true,
      enableMetaHeader: false
    });
    
    await esClient.ping();
    console.log('✅ Connected to Elasticsearch with admin credentials');
  } catch (error) {
    console.log(`❌ Elasticsearch connection failed: ${error.message}`);
    esClient = null;
  }
}

let token = null;

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
    const agents = response.data.data.affected_items;
    cachedAgents = agents;
    return agents;
  } catch (error) {
    if (error.response?.status === 401) {
      await getToken();
      return fetchAllAgents();
    }
    console.error('Fetch agents failed:', error.message);
    return cachedAgents;
  }
}

// Cache for agents and logs to avoid rate limiting
let cachedAgents = [];
let cachedLogs = [];

async function fetchLogs() {
  try {
    // Try Elasticsearch first for real alerts
    if (esClient) {
      const response = await esClient.search({
        index: 'wazuh-alerts-*',
        body: {
          query: {
            range: {
              '@timestamp': {
                gte: 'now-1h',
                lte: 'now'
              }
            }
          },
          sort: [{ '@timestamp': { order: 'desc' } }],
          size: 100
        }
      });
      
      const hits = response.body.hits.hits;
      console.log(`Found ${hits.length} real Wazuh alerts from OpenSearch`);
      
      const formattedLogs = hits.map(hit => {
        const source = hit._source;
        console.log('Raw Elasticsearch hit:', JSON.stringify(source, null, 2));
        return {
          id: hit._id,
          timestamp: source['@timestamp'] || source.timestamp,
          level: source.rule?.level >= 7 ? 'HIGH' : source.rule?.level >= 4 ? 'MEDIUM' : 'LOW',
          message: source.rule?.description || 'Security alert',
          agentName: source.agent?.name || 'wazuh-server',
          agentId: source.agent?.id || '000',
          agentIp: source.agent?.ip || 'N/A',
          location: source.location || 'unknown',
          ruleId: source.rule?.id || hit._id.slice(-6),
          decoder: source.decoder?.name || 'wazuh',
          full_log: source.full_log || '',
          previous_output: source.previous_output || '',
          manager: source.manager?.name || 'wazuh-server',
          input_type: source.input?.type || 'log',
          rule_level: source.rule?.level,
          rule_groups: source.rule?.groups || [],
          rule_pci_dss: source.rule?.pci_dss || [],
          rule_gdpr: source.rule?.gdpr || [],
          rule_description: source.rule?.description || 'Security alert',
          _index: hit._index,
          // Raw source for debugging
          _source: source
        };
      });
      
      // Cache the logs
      cachedLogs = formattedLogs;
      return formattedLogs;
    }
    
    throw new Error('No Elasticsearch data available');
    

    
  } catch (error) {
    // Return cached logs if available
    if (cachedLogs.length > 0) {
      return cachedLogs;
    }
    
    return [];
  }
}

io.on('connection', async (socket) => {
  console.log('Client connected');
  
  const agents = await fetchAllAgents();
  const logs = await fetchLogs();
  
  socket.emit('agents:initial', agents);
  socket.emit('logs:initial', logs);
  
  const interval = setInterval(async () => {
    const updatedAgents = await fetchAllAgents();
    const updatedLogs = await fetchLogs();
    socket.emit('agents:update', updatedAgents);
    socket.emit('logs:update', updatedLogs);
  }, 30000); // Increased to 30 seconds to avoid rate limiting
  
  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

setInterval(getToken, 14 * 60 * 1000);

app.post("/api/webhook", (req, res) => {
  console.log("Received webhook data:", req.body);
  res.json({ success: true, message: "Data received successfully" });
});

app.post("/api/field-click", (req, res) => {
  const { field, data, timestamp, agentCount } = req.body;
  
  console.log('\n' + '='.repeat(50));
  console.log(`🔍 FIELD CLICKED: ${field.toUpperCase()}`);
  console.log(`⏰ Timestamp: ${timestamp}`);
  console.log(`👥 Agent Count: ${agentCount}`);
  console.log(`📊 Data Count: ${data ? data.length : 0}`);
  console.log('📋 Field Data:');
  
  if (data && Array.isArray(data) && data.length > 0) {
    const uniqueData = [...new Set(data.filter(item => item && item !== 'N/A'))];
    uniqueData.slice(0, 10).forEach((item, index) => {
      console.log(`   ${index + 1}. ${item}`);
    });
    if (uniqueData.length > 10) {
      console.log(`   ... and ${uniqueData.length - 10} more unique items`);
    }
  } else {
    console.log('   ❌ No valid data available');
    console.log('   Raw data received:', JSON.stringify(data));
  }
  
  console.log('='.repeat(50) + '\n');
  
  res.json({ success: true, message: "Field click logged to terminal" });
});



app.post("/api/agent/restart", async (req, res) => {
  const { agentId } = req.body;
  
  try {
    if (!token) await getToken();
    
    // Restart agent using correct endpoint
    const response = await axiosInstance.put(`${WAZUH_API}/agents/restart`, {
      agents_list: [agentId]
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log(`Agent ${agentId} restart initiated:`, response.data);
    res.json({ success: true, message: "Agent restart initiated" });
  } catch (error) {
    console.error('Agent restart failed:', error.message, error.response?.data);
    const errorMsg = error.response?.data?.detail || error.message;
    res.status(500).json({ success: false, message: `Restart failed: ${errorMsg}` });
  }
});

app.post("/api/agent/uninstall", async (req, res) => {
  const { agentId } = req.body;
  
  console.log(`Attempting to uninstall agent: ${agentId}`);
  
  try {
    if (!token) await getToken();
    
    // First check if agent exists
    try {
      const checkResponse = await axiosInstance.get(`${WAZUH_API}/agents/${agentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(`Agent ${agentId} found, proceeding with uninstall`);
    } catch (checkError) {
      if (checkError.response?.status === 404) {
        return res.status(404).json({ success: false, message: `Agent ${agentId} not found in Wazuh manager` });
      }
      throw checkError;
    }
    
    // Remove agent from Wazuh manager using correct endpoint
    const response = await axiosInstance.delete(`${WAZUH_API}/agents`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { agents_list: agentId }
    });
    
    console.log(`Agent ${agentId} uninstalled successfully:`, response.data);
    res.json({ success: true, message: "Agent uninstalled successfully" });
  } catch (error) {
    console.error('Agent uninstall failed:', error.message, error.response?.data);
    const errorMsg = error.response?.data?.detail || error.message;
    res.status(500).json({ success: false, message: `Uninstall failed: ${errorMsg}` });
  }
});

// Suppress OpenSearch compatibility warnings
process.env.ELASTIC_CLIENT_APIVERSIONING = 'true';

server.listen(3000, '0.0.0.0', async () => {
  console.log('Wazuh backend running on port 3000');
  await initElasticsearch();
  getToken();
});