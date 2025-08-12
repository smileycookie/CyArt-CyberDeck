import { Document, Model, Schema, model } from 'mongoose';

export interface IEvent extends Document {
  agent_id: string;
  timestamp: Date;
  rule_id: number;
  rule_description: string;
  severity: number;
  src_ip?: string;
  dst_ip?: string;
  user?: string;
  event_data: object;
}
interface IEvent extends Document {
  agent_id: string;
  agent_name: string;  // Added
  agent_ip: string;    // Added
  timestamp: Date;
  rule: {
    id: number;
    description: string;
    level: number;
  };

}
const EventSchema = new Schema<IEvent>({
  agent_id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  rule_id: { type: Number, required: true },
  rule_description: { type: String, required: true },
  severity: { type: Number, required: true },
  src_ip: { type: String },
  dst_ip: { type: String },
  user: { type: String },
  error_code: { type: String },
  user_id: { type: String },
  ip_address: { type: String },
  status_code: { type: Number },
  event_data: { type: Object, required: true }
});

export const Event: Model<IEvent> = model<IEvent>('Event', EventSchema);
