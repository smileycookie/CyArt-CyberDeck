import { Router } from 'express';
import { getEvents, getEventStats, getEventsChart, seedTestData, getAgentOverview } from '../controllers/events.controller';
import { fetchWazuhAlerts } from '../controllers/wazuh-api.controller';

const router = Router();

router.get('/', getEvents);
router.get('/stats', getEventStats);
router.get('/chart', getEventsChart);
router.get('/agents', getAgentOverview);
router.post('/seed', seedTestData);
router.post('/sync-wazuh', fetchWazuhAlerts);

export default router;
