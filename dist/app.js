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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./graphql/schema");
const client_1 = require("@prisma/client");
const auth_1 = require("./context/auth");
const prisma = new client_1.PrismaClient();
const createServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema_1.schema,
        context: ({ req }) => ({
            prisma,
            userId: (0, auth_1.getUserId)(req),
        }),
    });
    yield server.start();
    server.applyMiddleware({ app });
    return app;
});
exports.createServer = createServer;
