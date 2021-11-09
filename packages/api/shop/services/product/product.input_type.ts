import { InputType, Field, ID, Int } from 'type-graphql';
import Product from './product.type';
import { ProductType } from './product.enum';
import { Category } from '../category/category.type';

@InputType({ description: 'Product Input' })
export default class ProductInput {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field(type => String, { nullable: true, defaultValue: "o lbs" })
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
