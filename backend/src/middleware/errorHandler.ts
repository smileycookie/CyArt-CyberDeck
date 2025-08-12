import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(`${err.message} ${req.method} ${req.url}`);
  
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
}
