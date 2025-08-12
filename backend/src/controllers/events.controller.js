"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventStats = exports.getEvents = void 0;
const event_model_1 = require("../models/event.model");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 100, offset = 0, severity, agent_id } = req.query;
        const filter = {};
        if (severity)
            filter.severity = severity;
        if (agent_id)
            filter.agent_id = agent_id;
        const events = yield event_model_1.Event.find(filter)
            .sort({ timestamp: -1 })
            .skip(Number(offset))
            .limit(Number(limit));
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getEvents = getEvents;
const getEventStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield event_model_1.Event.aggregate([
            {
                $group: {
                    _id: null,
                    totalEvents: { $sum: 1 },
                    highSeverity: {
                        $sum: { $cond: [{ $gte: ["$severity", 10] }, 1, 0] }
                    },
                    agents: { $addToSet: "$agent_id" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalEvents: 1,
                    highSeverity: 1,
                    agentCount: { $size: "$agents" }
                }
            }
        ]);
        res.json(stats[0] || { totalEvents: 0, highSeverity: 0, agentCount: 0 });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getEventStats = getEventStats;
