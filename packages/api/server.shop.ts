import 'reflect-metadata';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { TypegooseMiddleware } from "./typegoose.middleware";
import { connectDB } from './db';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './shop/services/user/user.resolver';
import { ProductResolver } from './shop/services/product/product.resolver';
import { PaymentResolver } from './shop/services/payment/payment.resolver';
import { OrderResolver } from './shop/services/order/order.resolver';
import { CouponResolver } from './shop/services/coupon/coupon.resolver';
import { CategoryResolver } from './shop/services/category/category.resolver';
const app: express.Application = express();

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

    globalMiddlewares: [TypegooseMiddleware],

    emitSchemaFile: {
      path: __dirname + "/schema.gql",
      commentDescriptions: true,

    }


  });
  

connectDB();
const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req, res }) => ({
    req,
    res
  }),
  tracing: true,
});

//set path == paths


apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/shop/graphql" });


app.listen(PORT, () => {
  console.log(`🚀 started http://localhost:${PORT}/shop/graphql`);
});
};

main();
