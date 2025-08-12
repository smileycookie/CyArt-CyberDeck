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
exports.getAgentStats = exports.getAgents = void 0;
const event_model_1 = require("../models/event.model");
const getAgents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agents = yield event_model_1.Event.distinct('agent_id');
        res.json(agents);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAgents = getAgents;
const getAgentStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const stats = yield event_model_1.Event.aggregate([
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAgentStats = getAgentStats;
