import { type } from 'os';
import { Field, Int, ArgsType } from 'type-graphql';
import { ProductType } from '../../../shop/services/product/product.enum';
@ArgsType()
export default class GetProductsArgs {
  @Field(type => Int, { defaultValue: 12 })
  limit: number;

  @Field(type => Int, { defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  sortByPrice?: string;

  @Field(type=> ProductType, { nullable: true })
  type?: ProductType;

  @Field({ nullable: true })
  searchText?: string;

  @Field({ nullable: true })
  category?: string;
}
