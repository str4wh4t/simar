import { createServer } from './app';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schema';
import { PrismaClient } from '@prisma/client';
import { getUserId } from './context/auth';
import type express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const prisma = new PrismaClient();

const apollo = new ApolloServer({
    schema,
    context: ({ req }) => ({
      prisma,
    //   userId: getUserId(req),
    }),
  });

const startServer = async (app: express.Express, apollo: ApolloServer) => {

  apollo.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
  });
};

const app = createServer();

startServer(app, apollo);
