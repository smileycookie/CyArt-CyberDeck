"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const logger_1 = __importDefault(require("../config/logger"));
function errorHandler(err, req, res, next) {
    logger_1.default.error(`${err.message} ${req.method} ${req.url}`);
    res.status(500).json({
        error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
    });
}
