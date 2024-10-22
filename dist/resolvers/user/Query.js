"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const nexus_1 = require("nexus");
exports.Query = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.list.field('users', {
            type: 'User',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.user.findMany();
            }
        });
    }
});
