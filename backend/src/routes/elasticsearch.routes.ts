import { Router } from 'express';
import wazuhAlertsService from '../services/wazuh-alerts.service';

const router = Router();

// Get latest alerts from Wazuh API
router.get('/alerts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const alerts = await wazuhAlertsService.getRecentAlerts(limit);
    
    if (alerts.length > 0) {
      res.json({ success: true, data: alerts });
    } else {
      // Fallback to mock data if no real alerts
      const mockAlerts = [
        {
          id: 'mock-1',
          timestamp: new Date().toISOString(),
          index: `wazuh-alerts-4.x-${new Date().toISOString().split('T')[0]}`,
          agentId: '000',
          agentName: 'wazuh-server',
          agentIp: '100.108.179.83',
          ruleId: '1002',
          ruleDescription: 'Wazuh server event',
          ruleLevel: 2,
          ruleGroups: ['wazuh'],
          ruleFiredtimes: 1,
          decoderName: 'wazuh',
          location: '/var/log/wazuh.log',
          managerName: 'wazuh-server',
          inputType: 'log',
          fullLog: `[${new Date().toISOString()}] Wazuh server event`
        }
      ];
      res.json({ success: true, data: mockAlerts });
    }
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch alerts' });
  }
});

export default router;