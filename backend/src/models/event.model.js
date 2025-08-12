"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    agent_id: { type: String, required: true },
    timestamp: { type: Date, required: true },
    rule_id: { type: Number, required: true },
    rule_description: { type: String, required: true },
    severity: { type: Number, required: true },
    src_ip: { type: String },
    dst_ip: { type: String },
    user: { type: String },
    event_data: { type: Object, required: true }
});
exports.Event = (0, mongoose_1.model)('Event', EventSchema);
