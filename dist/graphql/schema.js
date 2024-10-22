"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const nexus_1 = require("nexus");
// import { nexusPrisma } from 'nexus-plugin-prisma';
const User_1 = require("./types/User");
const Query_1 = require("../resolvers/user/Query");
const Mutation_1 = require("../resolvers/user/Mutation");
const path_1 = __importDefault(require("path"));
exports.schema = (0, nexus_1.makeSchema)({
    types: [User_1.User, Query_1.Query, Mutation_1.Mutation],
    //   plugins: [nexusPrisma()],
    outputs: {
        schema: path_1.default.join(__dirname, './', 'generated', 'schema.graphql'),
        typegen: path_1.default.join(__dirname, './', 'generated', 'nexus.ts')
    }
});
