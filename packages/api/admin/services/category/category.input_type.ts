import { InputType, Field, ID, Int } from 'type-graphql';
import { Category } from '../../../shop/services/category/category.type';
@InputType({ description: 'New Category Data' })
export class AddCategoryInput implements Partial<Category> {
  
  @Field(type => ID)
  id: string;

  
  @Field()
  title: string;

  
  @Field(type => [AddCategoryInput], { nullable: true })
  children: AddCategoryInput[];

  
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
