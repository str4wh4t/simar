import { makeSchema } from 'nexus';
// import { nexusPrisma } from 'nexus-plugin-prisma';
import { User } from './types/User';
import { Query } from '../resolvers/user/Query';
import { Mutation } from '../resolvers/user/Mutation';
import path from 'path';

export const schema = makeSchema({
  types: [User, Query, Mutation],
//   plugins: [nexusPrisma()],
  outputs: {
    schema: path.join(__dirname, './', 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, './', 'generated', 'nexus.ts')
  }
});
