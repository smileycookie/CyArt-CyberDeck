import { Router } from 'express';
import { handleWebhook, testWebhook } from '../controllers/webhook.controller';

const router = Router();

router.post('/', handleWebhook);
router.get('/test', testWebhook);

export default router;
