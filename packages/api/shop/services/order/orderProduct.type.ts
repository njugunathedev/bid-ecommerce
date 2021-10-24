import { type } from 'os';
import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType()
export default class OrderedProduct {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field(type => Int)
  weight: number;

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