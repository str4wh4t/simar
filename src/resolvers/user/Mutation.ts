import { extendType, stringArg } from 'nexus';
import { hashPassword, comparePassword } from '../../utils/hash';
import jwt from 'jsonwebtoken';

export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: {
        name: stringArg(),
        username: stringArg(),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { name, username, email, password }, ctx) => {
        const hashedPassword = await hashPassword(password);
        return ctx.prisma.user.create({
          data: {
            name,
            username,
            email,
            password: hashedPassword,
          },
        });
      },
    });

    t.field('login', {
      type: 'String',
      args: {
        username: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { username, password }, ctx) => {
        const user = await ctx.prisma.user.findUnique({ where: { username } });
        if (!user || !(await comparePassword(password, user.password))) {
          throw new Error('Invalid username or password');
        }

        return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      },
    });
  },
});
