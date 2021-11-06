import { type } from 'os';
import * as mongoose from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import Product from './orderProduct.type';
import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';
// import { OrderStatusEnum } from './orderStatusEnum';

@modelOptions({ options: { allowMixed : Severity.ALLOW} })

@ObjectType()
export class Order {
  @prop()
  @Field(type => ID)
  id: string;

  @prop()
  @Field()
  userId: string;

  @prop()
  @Field(type => [Product])
  products: Product[];

  @prop()
  @Field(type => String)
  status: number;

  @prop()
  @Field(type => String)
  deliveryTime: string;

  @prop()
  @Field(type => String)
  amount: number;

  @prop()
  @Field(type => String)
  subtotal: number;

  @prop()
  @Field(type => String)
  discount: number;

  @prop()
  @Field(type => String)
  deliveryFee: number;

  @prop()
  @Field(type => String)
  deliveryAddress: string;

  @prop()
  @Field(type => String)
  date: string;
}
export const OrderModel = getModelForClass(Order, { schemaOptions: { timestamps: true } });
