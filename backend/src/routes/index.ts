import { Router } from 'express';
import eventsRouter from './events.routes';
import agentsRouter from './agents.routes';
import webhookRouter from './webhook.routes';
import testRouter from './test.routes';
import elasticsearchRouter from './elasticsearch.routes';

const router = Router();

router.use('/events', eventsRouter);
router.use('/agents', agentsRouter);
router.use('/webhook', webhookRouter);
router.use('/test', testRouter);
router.use('/elasticsearch', elasticsearchRouter);

// Add seed route directly
router.post('/test/seed', async (req, res) => {
  try {
    const { Event } = await import('../models/event.model');
    await Event.deleteMany({});
    
    const sampleEvents = [];
    for (let i = 0; i < 20; i++) {
      const randomDate = new Date();
      randomDate.setHours(randomDate.getHours() - Math.floor(Math.random() * 24));
      
      sampleEvents.push({
        agent_id: `agent_${Math.floor(Math.random() * 3) + 1}`,
        timestamp: randomDate,
        rule_id: Math.floor(Math.random() * 1000) + 1000,
        rule_description: ['SSH login attempt', 'Failed authentication', 'Suspicious activity'][Math.floor(Math.random() * 3)],
        severity: [2, 5, 8, 12][Math.floor(Math.random() * 4)],
        src_ip: '100.108.179.83',
        dst_ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        event_data: { action: 'test_event' }
      });
    }
    
    await Event.insertMany(sampleEvents);
    res.json({ success: true, message: `Seeded ${sampleEvents.length} events`, count: sampleEvents.length });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to seed data' });
  }
});

export default router;
