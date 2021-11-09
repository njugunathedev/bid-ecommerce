import { InputType, Field, ID, Int } from 'type-graphql';
import { Category } from '../../../shop/services/category/category.type';
@InputType({ description: 'New Category Data' })
export default class AddCategoryInput implements Partial<Category> {
  
  @Field(type => ID)
  id: number;

  
  @Field()
  title: string;

  
  @Field(type => [Category])
  children: Category[];

  
  @Field(type => String)
  type: string;

  
  @Field(type => String)
  icon: string;

  
  @Field({ defaultValue: 0 })
  number_of_product?: number;

  
  @Field(type => String)
  slug: string;

    
  @Field()
  created_date: Date;
}
