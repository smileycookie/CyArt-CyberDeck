import { Request, Response } from 'express';
import { Event } from '../models/event.model';

export const seedTestData = async (req: Request, res: Response) => {
  try {
    // Clear existing data
    await Event.deleteMany({});
    
    // Create sample events from IP 100.108.179.83
    const sampleEvents = [];
    const severityLevels = [2, 5, 8, 12]; // low, medium, high, critical
    const ruleDescriptions = [
      'SSH login attempt',
      'Failed authentication',
      'Suspicious file access',
      'Malware detected',
      'Brute force attack',
      'Privilege escalation attempt'
    ];
    
    for (let i = 0; i < 50; i++) {
      const randomDate = new Date();
      randomDate.setHours(randomDate.getHours() - Math.floor(Math.random() * 24));
      
      sampleEvents.push({
        agent_id: `agent_${Math.floor(Math.random() * 5) + 1}`,
        timestamp: randomDate,
        rule_id: Math.floor(Math.random() * 1000) + 1000,
        rule_description: ruleDescriptions[Math.floor(Math.random() * ruleDescriptions.length)],
        severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
        src_ip: '100.108.179.83',
        dst_ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        user: `user${Math.floor(Math.random() * 10) + 1}`,
        event_data: {
          action: 'login_attempt',
          protocol: 'ssh',
          port: 22
        }
      });
    }
    
    await Event.insertMany(sampleEvents);
    
    res.json({ 
      message: 'Test data seeded successfully', 
      count: sampleEvents.length 
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Failed to seed test data' });
  }
};