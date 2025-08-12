// seed.js

require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

// Connect to MongoDB using .env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Define Event schema and model
const EventSchema = new mongoose.Schema({
  agent_id: String,
  timestamp: Date,
  rule_id: Number,
  rule_description: String,
  severity: Number,
  src_ip: String,
  dst_ip: String,
  error_code: String,
  user_id: String,
  ip_address: String,
  status_code: Number,
  event_data: Object
});

const Event = mongoose.model('Event', EventSchema);

// Seed function
async function seedAgents() {
  try {
    // Clear existing data
    await Event.deleteMany({});

    // Define agents
    const agents = [
      { name: 'danish', ip: '100.108.179.83', os: 'Linux', status: 'Online' },
      { name: 'abhinay', ip: '100.65.90.67', os: 'Linux', status: 'Offline' },
      { name: 'anujith-kali', ip: '100.67.20.9', os: 'Linux', status: 'Offline' },
      { name: 'harish1', ip: '100.83.130.34', os: 'Linux', status: 'Offline' },
      { name: 'jignesh-kali-2', ip: '100.123.191.37', os: 'Linux', status: 'Offline' },
      { name: 'jignesh', ip: '100.92.23.18', os: 'Windows', status: 'Offline' },
      { name: 'kali-1', ip: '100.104.255.45', os: 'Linux', status: 'Offline' },
      { name: 'kali', ip: '100.123.70.15', os: 'Linux', status: 'Offline' },
      { name: 'nakul', ip: '100.101.78.86', os: 'Windows', status: 'Offline' },
      { name: 'ragini', ip: '100.107.192.48', os: 'Linux', status: 'Offline' },
      { name: 'sreenithi', ip: '100.70.177.127', os: 'Linux', status: 'Offline' },
      { name: 'system-ripun', ip: '100.64.179.66', os: 'Windows', status: 'Offline' },
      { name: 'vineel', ip: '100.117.12.80', os: 'Windows', status: 'Offline' },
      { name: 'virti-mehta', ip: '100.68.229.23', os: 'Windows', status: 'Online' },
      { name: 'vishwa-virthi-vapt', ip: '100.111.114.60', os: 'Windows', status: 'Online' },
      { name: 'wazuh-server-1', ip: '100.123.230.51', os: 'Linux', status: 'Offline' },
      { name: 'wazuh-server', ip: '100.66.240.63', os: 'Linux', status: 'Offline' }
    ];

    const sampleEvents = [];

    agents.forEach((agent) => {
      const eventCount = agent.status === 'Online' ? 8 : 3;
      for (let i = 0; i < eventCount; i++) {
        const randomDate = new Date();
        const minutesAgo = agent.status === 'Online'
          ? Math.floor(Math.random() * 30)
          : Math.floor(Math.random() * 360) + 60;
        randomDate.setMinutes(randomDate.getMinutes() - minutesAgo);

        sampleEvents.push({
          agent_id: agent.name,
          timestamp: randomDate,
          rule_id: Math.floor(Math.random() * 1000) + 1000,
          rule_description: [
            'SSH login attempt',
            'Failed authentication',
            'Suspicious activity',
            'File access denied',
            'Network connection blocked',
            'Malware detected'
          ][Math.floor(Math.random() * 6)],
          severity: [2, 5, 8, 12][Math.floor(Math.random() * 4)],
          src_ip: agent.ip,
          dst_ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
          error_code: ['E001', 'E002', 'E403', 'E500'][Math.floor(Math.random() * 4)],
          user_id: `user_${Math.floor(Math.random() * 100) + 1}`,
          ip_address: agent.ip,
          status_code: [200, 401, 403, 404, 500][Math.floor(Math.random() * 5)],
          event_data: {
            action: 'security_event',
            agent_name: agent.name,
            source_ip: agent.ip,
            os: agent.os
          }
        });
      }
    });

    // Insert into DB
    await Event.insertMany(sampleEvents);
    console.log(`✅ Seeded ${sampleEvents.length} events from ${agents.length} agents`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedAgents();
