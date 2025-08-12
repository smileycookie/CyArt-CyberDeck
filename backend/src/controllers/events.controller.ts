import { Request, Response } from 'express';
import { Event } from '../models/event.model';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { limit = 100, offset = 0, severity, agent_id, src_ip } = req.query;
    
    const filter: any = {};
    if (severity) filter.severity = severity;
    if (agent_id) filter.agent_id = agent_id;
    if (src_ip) filter.src_ip = src_ip;
    
    const events = await Event.find(filter)
      .sort({ timestamp: -1 })
      .skip(Number(offset))
      .limit(Number(limit));
      
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEventStats = async (req: Request, res: Response) => {
  try {
    const stats = await Event.aggregate([
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          highSeverity: {
            $sum: { $cond: [{ $gte: ["$severity", 10] }, 1, 0] }
          },
          agents: { $addToSet: "$agent_id" }
        }
      },
      {
        $project: {
          _id: 0,
          totalEvents: 1,
          highSeverity: 1,
          agentCount: { $size: "$agents" }
        }
      }
    ]);
    
    res.json(stats[0] || { totalEvents: 0, highSeverity: 0, agentCount: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEventsChart = async (req: Request, res: Response) => {
  try {
    const { timeRange = '24h', src_ip } = req.query;
    
    let hours = 24;
    if (timeRange === '1h') hours = 1;
    else if (timeRange === '7d') hours = 24 * 7;
    else if (timeRange === '30d') hours = 24 * 30;
    
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - hours);
    
    const filter: any = {
      timestamp: { $gte: startDate }
    };
    if (src_ip) filter.src_ip = src_ip;
    
    const chartData = await Event.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            severity: {
              $switch: {
                branches: [
                  { case: { $lte: ["$severity", 3] }, then: "low" },
                  { case: { $lte: ["$severity", 7] }, then: "medium" },
                  { case: { $lte: ["$severity", 10] }, then: "high" },
                  { case: { $gt: ["$severity", 10] }, then: "critical" }
                ],
                default: "unknown"
              }
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          low: { $sum: { $cond: [{ $eq: ["$_id.severity", "low"] }, "$count", 0] } },
          medium: { $sum: { $cond: [{ $eq: ["$_id.severity", "medium"] }, "$count", 0] } },
          high: { $sum: { $cond: [{ $eq: ["$_id.severity", "high"] }, "$count", 0] } },
          critical: { $sum: { $cond: [{ $eq: ["$_id.severity", "critical"] }, "$count", 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const formattedData = chartData.map(item => ({
      date: item._id,
      low: item.low || 0,
      medium: item.medium || 0,
      high: item.high || 0,
      critical: item.critical || 0
    }));
    
    // If no data, return empty array
    res.json(formattedData.length > 0 ? formattedData : []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAgentOverview = async (req: Request, res: Response) => {
  try {
    const agentStats = await Event.aggregate([
      {
        $group: {
          _id: {
            agent_id: "$agent_id",
            src_ip: "$src_ip"
          },
          totalEvents: { $sum: 1 },
          highSeverity: {
            $sum: { $cond: [{ $gte: ["$severity", 8] }, 1, 0] }
          },
          lastSeen: { $max: "$timestamp" },
          avgSeverity: { $avg: "$severity" },
          recentEvents: {
            $push: {
              timestamp: "$timestamp",
              error_code: "$error_code",
              user_id: "$user_id",
              ip_address: "$ip_address",
              status_code: "$status_code"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          agent_id: "$_id.agent_id",
          src_ip: "$_id.src_ip",
          totalEvents: 1,
          highSeverity: 1,
          lastSeen: 1,
          avgSeverity: { $round: ["$avgSeverity", 1] },
          status: {
            $cond: [
              { $gte: ["$lastSeen", new Date(Date.now() - 5 * 60 * 1000)] },
              "active",
              "idle"
            ]
          },
          recentEvents: { $slice: ["$recentEvents", -5] }
        }
      },
      { $sort: { totalEvents: -1 } }
    ]);
    
    res.json(agentStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const seedTestData = async (req: Request, res: Response) => {
  try {
    await Event.deleteMany({});
    
    const tailscaleIPs = [
      '100.108.179.83', '100.65.90.67', '100.67.20.9', '100.83.130.34',
      '100.123.191.37', '100.92.23.18', '100.104.255.45', '100.123.70.15',
      '100.101.78.86', '100.107.192.48', '100.70.177.127', '100.64.179.66',
      '100.117.12.80', '100.68.229.23', '100.111.114.60', '100.123.230.51',
      '100.66.240.63'
    ];
    
    const agentNames = [
      'danish', 'abhinay', 'anujith-kali', 'harish1', 'jignesh-kali-2',
      'jignesh', 'kali-1', 'kali', 'nakul', 'ragini', 'sreenithi',
      'system-ripun', 'vineel', 'virti-mehta', 'vishwa-virthi-vapt',
      'wazuh-server-1', 'wazuh-server'
    ];
    
    const sampleEvents = [];
    for (let i = 0; i < 50; i++) {
      const randomDate = new Date();
      randomDate.setHours(randomDate.getHours() - Math.floor(Math.random() * 24));
      const randomIP = tailscaleIPs[Math.floor(Math.random() * tailscaleIPs.length)];
      const randomAgent = agentNames[Math.floor(Math.random() * agentNames.length)];
      
      sampleEvents.push({
        agent_id: randomAgent,
        timestamp: randomDate,
        rule_id: Math.floor(Math.random() * 1000) + 1000,
        rule_description: [
          'SSH login attempt', 'Failed authentication', 'Suspicious activity',
          'File access denied', 'Network connection blocked', 'Malware detected',
          'Privilege escalation', 'Brute force attack'
        ][Math.floor(Math.random() * 8)],
        severity: [2, 5, 8, 12][Math.floor(Math.random() * 4)],
        src_ip: randomIP,
        dst_ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        error_code: ['E001', 'E002', 'E403', 'E500', 'E404'][Math.floor(Math.random() * 5)],
        user_id: `user_${Math.floor(Math.random() * 100) + 1}`,
        ip_address: randomIP,
        status_code: [200, 401, 403, 404, 500][Math.floor(Math.random() * 5)],
        event_data: { 
          action: 'security_event',
          agent_name: randomAgent,
          source_ip: randomIP
        }
      });
    }
    
    await Event.insertMany(sampleEvents);
    res.json({ success: true, message: `Seeded ${sampleEvents.length} events from ${tailscaleIPs.length} agents`, count: sampleEvents.length });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to seed data' });
  }
};
