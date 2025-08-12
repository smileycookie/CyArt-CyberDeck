import { Request, Response } from 'express';
import { Event } from '../models/event.model';

const WAZUH_API_URL = 'https://100.66.240.63:55000';
const WAZUH_USER = 'wazuh';
const WAZUH_PASS = 'wazuh';

export const fetchWazuhAlerts = async (req: Request, res: Response) => {
  try {
    // Get auth token
    const authResponse = await fetch(`${WAZUH_API_URL}/security/user/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${WAZUH_USER}:${WAZUH_PASS}`).toString('base64')}`
      },
      body: JSON.stringify({
        user: WAZUH_USER,
        password: WAZUH_PASS
      })
    });

    const authData = await authResponse.json();
    const token = authData.data.token;

    // Fetch alerts
    const alertsResponse = await fetch(`${WAZUH_API_URL}/alerts?limit=100`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const alertsData = await alertsResponse.json();
    
    // Convert Wazuh alerts to our format
    const events = alertsData.data.affected_items.map((alert: any) => ({
      agent_id: alert.agent.name,
      timestamp: new Date(alert.timestamp),
      rule_id: alert.rule.id,
      rule_description: alert.rule.description,
      severity: alert.rule.level,
      src_ip: alert.agent.ip,
      event_data: alert
    }));

    // Save to database
    await Event.insertMany(events);
    
    res.json({ success: true, count: events.length, message: 'Wazuh alerts imported' });
  } catch (error) {
    console.error('Wazuh API Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch Wazuh alerts' });
  }
};