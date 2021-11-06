import { Timestamp } from 'bson';
import { type } from 'os';
import { InputType, Field, ID, Int } from 'type-graphql';
import { Order } from './order.type';
import Product from './orderProduct.type';

// import { OrderStatusEnum } from './orderStatusEnum';
@InputType({ description: 'Product Input' })
class ProductInput {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field(type => String, { defaultValue: '0 lbs', nullable: true })
  weight: string;

  @Field()
  image: string;

  @Field(type => Int)
  price: number;

  @Field()
  category: string;
  
  @Field(type => Int)
  quantity: number;

  @Field(type => Int)
  total: number;
}
@InputType({ description: 'New Order Data' })
export default class AddOrderInput {
  @Field(type => ID)
  id: number;

  @Field()
  userId: string;

  @Field(type => [ProductInput], { nullable: true })
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
