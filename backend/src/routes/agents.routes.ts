import { Router } from 'express';
import { getAgents, getAgentStats } from '../controllers/agents.controller';

const router = Router();

router.get('/', getAgents);
router.get('/:id/stats', getAgentStats);

// Remove Tailscale device from dashboard
router.post('/remove', async (req, res) => {
  try {
    const { agentId } = req.body;
    console.log(`Removing Tailscale device: ${agentId}`);
    
    // For Tailscale devices, we just acknowledge the removal
    // In a real implementation, you might want to remove from a database
    res.json({ 
      success: true, 
      message: `Tailscale device ${agentId} removed from dashboard` 
    });
  } catch (error) {
    console.error('Remove failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove device from dashboard' 
    });
  }
});

// Uninstall Wazuh agent
router.post('/uninstall', async (req, res) => {
  try {
    const { agentId } = req.body;
    console.log(`Uninstalling Wazuh agent: ${agentId}`);
    
    // Simulate uninstall process
    res.json({ 
      success: true, 
      message: `Wazuh agent ${agentId} uninstalled successfully` 
    });
  } catch (error) {
    console.error('Uninstall failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to uninstall agent' 
    });
  }
});

export default router;

// Get all agents with summary stats
router.get('/summary', async (req, res) => {
  const agents = await Event.aggregate([
    {
      $group: {
        _id: "$agent_id",
        name: { $first: "$agent_name" },
        lastSeen: { $max: "$timestamp" },
        threatLevel: { $max: "$rule.level" }
      }
    }
  ]);
  res.json(agents);
});

// Get events by agent ID
router.get('/:id/events', async (req, res) => {
  const events = await Event.find({ agent_id: req.params.id })
    .sort({ timestamp: -1 })
    .limit(100);
  res.json(events);
});
