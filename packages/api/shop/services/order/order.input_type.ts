import { type } from 'os';
import { InputType, Field, ID, GraphQLISODateTime } from 'type-graphql';
import Order from './order.type';
import ProductInput from '../product/product.input_type';
import Product from './orderProduct.type';

// import { OrderStatusEnum } from './orderStatusEnum';

@InputType({ description: 'New Order Data' })
export default class AddOrderInput {
  @Field()
  id: number;

  @Field()
  userId: number;

  @Field(type => [ProductInput])
  products: ProductInput[];

  @Field(type => String)
  status: number;

  @Field(type => String)
  deliveryTime: string;

  @Field(type => String)
  amount: number;

  @Field(type => String)
  subtotal: number;

  @Field(type => String)
  discount: number;

  @Field(type => String)
  deliveryFee: number;

  @Field(type => String)
  deliveryAddress: string;

  @Field(type => String)
  date: string;
}
