import 'reflect-metadata';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ApolloServerPluginUsageReporting } from 'apollo-server-core';

import { buildSchema } from 'type-graphql';
import { UserResolver } from './shop/services/user/user.resolver';
import { ProductResolver } from './shop/services/product/product.resolver';
import { PaymentResolver } from './shop/services/payment/payment.resolver';
import { OrderResolver } from './shop/services/order/order.resolver';
import { CouponResolver } from './shop/services/coupon/coupon.resolver';
import { CategoryResolver } from './shop/services/category/category.resolver';
const app: express.Application = express();
const path = '/shop/graphql';
const PORT = process.env.PORT || 4000;
const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver,
      PaymentResolver,
      OrderResolver,
      CouponResolver,
      CategoryResolver,
    ],
    
  });
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    tracing: true,
    plugins: [
      ApolloServerPluginUsageReporting({
        rewriteError(err) {
          // Return `null` to avoid reporting `AuthenticationError`s
          if (err instanceof AuthenticationError) {
            return null;
          }
          
          // All other errors will be reported.
          return err;
        }
      }),
    ],
  });
  apolloServer.applyMiddleware({ app, path });

  app.listen(PORT, () => {
    console.log(`🚀 started http://localhost:${PORT}${path}`);
  });
};

main();
