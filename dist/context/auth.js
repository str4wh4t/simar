"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserId = (req) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return null;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    }
    catch (e) {
        return null;
    }
};
exports.getUserId = getUserId;
