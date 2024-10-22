import { extendType } from 'nexus';

export const Query = extendType({
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
