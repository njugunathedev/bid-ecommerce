import { prop } from '@typegoose/typegoose';
import { type } from 'os';
import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType()
export default class OrderedProduct {
  @prop()
  @Field(type => ID)
  id: number;

  @prop()
  @Field()
  title: string;

  @prop()
  @Field(type => String)
  weight: string;

  @prop()
  @Field()
  image: string;

  @prop()
  @Field(type => Int)
  price: number;

  @prop()
  @Field()
  category: string;
  
  @prop()
  @Field(type => Int)
  quantity: number;

  @prop()
  @Field(type => Int)
  total: number;
  

}