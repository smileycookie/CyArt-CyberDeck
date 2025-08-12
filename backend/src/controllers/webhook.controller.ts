import { Request, Response } from 'express';
import { Event } from '../models/event.model';

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    const event = new Event({
      agent_id: eventData.agent_id || 'webhook_agent',
      timestamp: new Date(eventData.timestamp) || new Date(),
      rule_id: eventData.rule_id || 1001,
      rule_description: eventData.rule_description || 'Webhook event',
      severity: eventData.severity || 5,
      src_ip: eventData.src_ip || '100.108.179.83',
      event_data: eventData
    });
    
    await event.save();
    
    const io = req.app.get('io');
    io.emit('new_event', event);
    
    res.status(200).json({ success: true, message: 'Event received' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to process webhook' });
  }
};

export const testWebhook = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Webhook endpoint working', data: req.body });
};
