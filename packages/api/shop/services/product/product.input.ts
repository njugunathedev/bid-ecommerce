import { type } from 'os';
import { InputType, Field } from 'type-graphql';
import { ProductType } from './product.enum';

@InputType()
class ProductSearchInput {
  @Field({ nullable: true })
  id?: string;

  @Field( type => String, { nullable: true })
  type: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field({ defaultValue: 10 })
  limit: number;
}

export default ProductSearchInput;
