import { Request, Response } from 'express';
import { Event } from '../models/event.model';
import dgram from 'dgram';

const syslogServer = dgram.createSocket('udp4');

export const startSyslogServer = () => {
  syslogServer.on('message', async (msg, rinfo) => {
    try {
      const syslogMessage = msg.toString();
      const sourceIP = rinfo.address;
      
      // Process messages from all Tailscale IPs
      const tailscaleIPs = [
        '100.108.179.83', '100.65.90.67', '100.67.20.9', '100.83.130.34',
        '100.123.191.37', '100.92.23.18', '100.104.255.45', '100.123.70.15',
        '100.101.78.86', '100.107.192.48', '100.70.177.127', '100.64.179.66',
        '100.117.12.80', '100.68.229.23', '100.111.114.60', '100.123.230.51',
        '100.66.240.63'
      ];
      
      if (tailscaleIPs.includes(sourceIP)) {
        const event = parseSyslogMessage(syslogMessage, sourceIP);
        if (event) {
          await new Event(event).save();
          console.log(`Saved event from ${sourceIP}`);
        }
      }
    } catch (error) {
      console.error('Syslog processing error:', error);
    }
  });

  syslogServer.bind(1514, '0.0.0.0', () => {
    console.log('Syslog server listening on port 1514');
  });
  
  syslogServer.on('error', (err) => {
    console.error('Syslog server error:', err.message);
    if (err.message.includes('EACCES')) {
      console.log('Try running with sudo or use port > 1024');
    }
  });
};

const parseSyslogMessage = (message: string, sourceIP: string) => {
  // Parse Wazuh syslog format
  let severity = 3;
  let ruleId = 5000;
  let agentName = 'unknown';
  let description = message.substring(0, 100);
  
  // Extract Wazuh alert info
  const ruleMatch = message.match(/Rule: (\d+)/);
  const levelMatch = message.match(/Level: (\d+)/);
  const agentMatch = message.match(/Agent: ([^\s]+)/);
  const descMatch = message.match(/Description: ([^\n]+)/);
  
  if (ruleMatch) ruleId = parseInt(ruleMatch[1]);
  if (levelMatch) severity = parseInt(levelMatch[1]);
  if (agentMatch) agentName = agentMatch[1];
  if (descMatch) description = descMatch[1];
  
  return {
    agent_id: agentName,
    timestamp: new Date(),
    rule_id: ruleId,
    rule_description: description,
    severity,
    src_ip: sourceIP,
    event_data: { 
      raw_message: message,
      wazuh_alert: true
    }
  };
};