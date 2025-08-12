"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agents_controller_1 = require("../controllers/agents.controller");
const router = (0, express_1.Router)();
router.get('/', agents_controller_1.getAgents);
router.get('/:id/stats', agents_controller_1.getAgentStats);
exports.default = router;
