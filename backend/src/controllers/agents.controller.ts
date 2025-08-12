import { Request, Response } from 'express';
import { Event } from '../models/event.model';

export const getAgents = async (req: Request, res: Response): Promise<void> => {
  try {
    const agents = await Event.distinct('agent_id');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAgentStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const stats = await Event.aggregate([
      { $match: { agent_id: id } },
      {
        $group: {
          _id: "$agent_id",
          totalEvents: { $sum: 1 },
          lastEvent: { $max: "$timestamp" }
        }
      }
    ]);
    
    res.json(stats[0] || {});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
