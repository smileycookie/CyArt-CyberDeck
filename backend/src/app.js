"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Database connection
(0, db_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN
}));
app.use(express_1.default.json());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.API_RATE_LIMIT || '100')
});
app.use(limiter);
// Routes
app.use('/api', routes_1.default);
// Error handling
app.use(errorHandler_1.default);
exports.default = app;
