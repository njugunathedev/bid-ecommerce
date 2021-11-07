import 'reflect-metadata';
import express from 'express';
import { TypegooseMiddleware } from "./typegoose.middleware";
import { connectDB } from './db';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import ProductResolver from './admin/services/product/product.resolver';
import CategoryResolver from './admin/services/category/category.resolver';
import CustomerResolver from './admin/services/customer/customer.resolver';
import CouponResolver from './admin/services/coupon/coupon.resolver';
import OrderResolver from './admin/services/order/order.resolver';
import StuffResolver from './admin/services/stuff/stuff.resolver';
const app: express.Application = express();
const path = '/admin/graphql';
const PORT = process.env.PORT || 4000;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      ProductResolver,
      CategoryResolver,
      CustomerResolver,
      OrderResolver,
      CouponResolver,
      StuffResolver,
    ],
    validate: false,
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
apolloServer.applyMiddleware({ app, path: "/admin/graphql" });


app.listen(PORT, () => {
  console.log(`🚀 started http://localhost:${PORT}/admin/graphql`);
});
};

main();

