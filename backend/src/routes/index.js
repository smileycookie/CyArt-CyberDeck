"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_routes_1 = __importDefault(require("./events.routes"));
const agents_routes_1 = __importDefault(require("./agents.routes"));
const router = (0, express_1.Router)();
router.use('/events', events_routes_1.default);
router.use('/agents', agents_routes_1.default);
exports.default = router;
