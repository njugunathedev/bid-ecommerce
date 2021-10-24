import { type } from 'os';
import { InputType, Field, ID, Int } from 'type-graphql';
import Order from './order.type';
import ProductInput from '../product/product.input_type';
import Product from './orderProduct.type';

// import { OrderStatusEnum } from './orderStatusEnum';

@InputType({ description: 'New Order Data' })
export default class AddOrderInput {
  @Field(type => ID)
  id: number;

  @Field()
  userId: number;

  @Field(type => [ProductInput])
  products: ProductInput[];

  @Field(type => Int)
  status: number;

  @Field(type => String)
  deliveryTime: string;

  @Field(type => Int)
  amount: number;

  @Field(type => Int)
  subtotal: number;

  @Field(type => Int)
  discount: number;

  @Field(type => Int)
  deliveryFee: number;

  @Field(type => String)
  deliveryAddress: string;

  @Field(type => String)
  date: string;

}
