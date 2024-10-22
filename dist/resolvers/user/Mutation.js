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
exports.Mutation = void 0;
const nexus_1 = require("nexus");
const hash_1 = require("../../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.Mutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('signup', {
            type: 'User',
            args: {
                name: (0, nexus_1.stringArg)(),
                username: (0, nexus_1.stringArg)(),
                email: (0, nexus_1.stringArg)(),
                password: (0, nexus_1.stringArg)(),
            },
            resolve: (_1, _a, ctx_1) => __awaiter(this, [_1, _a, ctx_1], void 0, function* (_, { name, username, email, password }, ctx) {
                const hashedPassword = yield (0, hash_1.hashPassword)(password);
                return ctx.prisma.user.create({
                    data: {
                        name,
                        username,
                        email,
                        password: hashedPassword,
                    },
                });
            }),
        });
        t.field('login', {
            type: 'String',
            args: {
                username: (0, nexus_1.stringArg)(),
                password: (0, nexus_1.stringArg)(),
            },
            resolve: (_1, _a, ctx_1) => __awaiter(this, [_1, _a, ctx_1], void 0, function* (_, { username, password }, ctx) {
                const user = yield ctx.prisma.user.findUnique({ where: { username } });
                if (!user || !(yield (0, hash_1.comparePassword)(password, user.password))) {
                    throw new Error('Invalid username or password');
                }
                return jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
            }),
        });
    },
});
