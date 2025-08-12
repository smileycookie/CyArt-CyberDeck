import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import connectDB from './config/db';
import { startSyslogServer } from './controllers/syslog.controller';

connectDB();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection handler
io.on('connection', async (socket) => {
  console.log('New client connected:', socket.id);
  
  // Send initial agent data
  const initialData = await getAgentData();
  socket.emit('agents:initial', initialData);
  
  // Send initial log data
  const initialLogs = await getLogData();
  socket.emit('logs:initial', initialLogs);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Emit agent updates every 30 seconds
setInterval(async () => {
  const agentData = await getAgentData();
  io.emit('agents:update', agentData);
  
  const logData = await getLogData();
  io.emit('logs:update', logData);
}, 30000);

async function getAgentData() {
  try {
    const { Event } = await import('./models/event.model');
    const agentStats = await Event.aggregate([
      {
        $group: {
          _id: "$agent_id",
          totalEvents: { $sum: 1 },
          highSeverity: { $sum: { $cond: [{ $gte: ["$severity", 8] }, 1, 0] } },
          lastSeen: { $max: "$timestamp" },
          avgSeverity: { $avg: "$severity" },
          src_ip: { $first: "$src_ip" }
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: "$_id",
          ip: "$src_ip",
          status: {
            $cond: [
              { $gte: ["$lastSeen", new Date(Date.now() - 5 * 60 * 1000)] },
              "Online",
              "Offline"
            ]
          },
          lastSeen: "$lastSeen",
          cvss: { $round: ["$avgSeverity", 1] },
          totalEvents: 1,
          highSeverity: 1
        }
      }
    ]);
    console.log(`Found ${agentStats.length} unique agents`);
    return agentStats;
  } catch (error) {
    console.error('Error fetching agent data:', error);
    return [];
  }
}

async function getLogData() {
  try {
    const { Event } = await import('./models/event.model');
    const logs = await Event.find({})
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();
    
    const formattedLogs = logs.map((log: any, index) => ({
      id: log._id.toString(),
      timestamp: log.timestamp,
      agentName: log.agent_id,
      agentId: log.agent_id,
      agentIp: log.src_ip || 'N/A',
      level: log.severity,
      description: log.rule_description,
      rule_description: log.rule_description,
      rule_level: log.severity,
      rule_groups: ['wazuh', 'security'],
      location: '/var/log/wazuh.log',
      decoder: 'wazuh',
      manager: 'wazuh-server',
      input_type: 'log',
      fullLog: `[${log.timestamp}] ${log.rule_description} from ${log.agent_id}`,
      full_log: `[${log.timestamp}] ${log.rule_description} from ${log.agent_id}`,
      groups: ['wazuh'],
      hipaa: ['164.312.b'],
      pci_dss: ['10.2.5'],
      rule_pci_dss: ['10.2.5'],
      rule_gdpr: [],
      inputType: 'log',
      ruleId: log.rule_id.toString(),
      message: log.rule_description
    }));
    
    // Add comprehensive mock data if no real logs
    if (formattedLogs.length === 0) {
      return [
        {
          id: 'mock-1',
          timestamp: new Date().toISOString(),
          agentName: 'wazuh-server',
          agentId: '000',
          agentIp: '100.108.179.83',
          level: 3,
          description: 'SSH successful login',
          rule_description: 'SSH successful login',
          rule_level: 3,
          rule_groups: ['authentication_success', 'syslog', 'sshd'],
          location: '/var/log/auth.log',
          decoder: 'sshd',
          manager: 'wazuh-server',
          input_type: 'log',
          fullLog: 'Jan 15 14:30:15 server sshd[12345]: Accepted publickey for user from 192.168.1.100 port 22 ssh2',
          full_log: 'Jan 15 14:30:15 server sshd[12345]: Accepted publickey for user from 192.168.1.100 port 22 ssh2',
          groups: ['authentication_success', 'syslog', 'sshd'],
          hipaa: ['164.312.b'],
          pci_dss: ['10.2.5'],
          rule_pci_dss: ['10.2.5'],
          rule_gdpr: [],
          inputType: 'log',
          ruleId: '1002',
          message: 'SSH successful login'
        },
        {
          id: 'mock-2',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          agentName: 'web-server-01',
          agentId: '001',
          agentIp: '192.168.1.10',
          level: 7,
          description: 'Apache: Multiple authentication failures from same source IP',
          rule_description: 'Apache: Multiple authentication failures from same source IP',
          rule_level: 7,
          rule_groups: ['web', 'apache', 'authentication_failed'],
          location: '/var/log/apache2/error.log',
          decoder: 'apache-errorlog',
          manager: 'wazuh-server',
          input_type: 'log',
          fullLog: '[Mon Jan 15 14:25:10.123456 2024] [auth_digest:error] [pid 1234] [client 203.0.113.45:54321] AH01793: invalid nonce received',
          full_log: '[Mon Jan 15 14:25:10.123456 2024] [auth_digest:error] [pid 1234] [client 203.0.113.45:54321] AH01793: invalid nonce received',
          groups: ['web', 'apache', 'authentication_failed'],
          hipaa: ['164.312.a.2.i', '164.312.a.2.ii'],
          pci_dss: ['10.2.4', '10.2.5'],
          rule_pci_dss: ['10.2.4', '10.2.5'],
          rule_gdpr: [],
          inputType: 'log',
          ruleId: '31151',
          message: 'Apache: Multiple authentication failures from same source IP'
        }
      ];
    }
    
    return formattedLogs;
  } catch (error) {
    console.error('Error fetching log data:', error);
    return [];
  }
}

// Make io accessible in routes
app.set('io', io);

// Start syslog server
startSyslogServer();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Syslog server ready to receive from 100.108.179.83');
});
