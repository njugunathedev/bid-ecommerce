import { NotNumberTypeError } from '@typegoose/typegoose/lib/internal/errors';
import { InputType, Field, ID, Int, Float } from 'type-graphql';
import { Product } from '../../../shop/services/product/product.type';
import CategoryInput from '../category/category.input_type';
import { ProductType } from '../../../shop/services/product/product.enum';
import TicketInput from '../../../shop/services/tickets/ticket.input_type'


@InputType()
class Gallery {
  @Field()
  url: string;
}
@InputType()
export class Meta {
  
  @Field()
  publisher: string;

  
  @Field()
  isbn: string;

  
  @Field()
  edition: string;

  
  @Field()
  country: string;

  
  @Field(() => [String])
  languages: string[];

  
  @Field()
  numberOfReader: string;

  
  @Field()
  numberOfPage: string;

  
  @Field()
  samplePDF: string;
}



@InputType()
export class Social {
  
  @Field(() => ID)
  id: string;

  
  @Field()
  media: string;

  
  @Field()
  profileLink: string;
}




@InputType()
export class Author {
  
  @Field(() => ID)
  id: string;

  
  @Field()
  name: string;

  
  @Field()
  avatar: string;

  
  @Field()
  bio: string;

  
  @Field()
  email: string;

  
  @Field()
  website: string;

  
  @Field(() => [Social])
  socials: Social[];
}
@InputType({ description: 'New recipe data' })
export default class AddProductInput implements Partial<Product> {
  
  @Field()
  id: number;

  
  @Field()
  slug: string;

  
  @Field()
  title: string;

  
  @Field(() => ProductType)
  type: ProductType;

  
  @Field(() => [CategoryInput])
  categories: CategoryInput[];

  
  @Field()
  unit: string;

  
  @Field()
  image: string;

  
  @Field(() => [Gallery])
  gallery: Gallery[];

  @Field()
  description: string;

  
  @Field()
  price: number;

  
  @Field()
  salePrice: number;

  
  @Field()
  discountInPercent: number;

  
  @Field(() => Author, { nullable: true })
  author?: Author;

  
  @Field(() => Meta, { nullable: true })
  meta?: Meta;

  
  @Field(() => [TicketInput], { nullable: true })
  ticket?: TicketInput[];

  
  @Field()
  createdAt: Date;

  
  @Field()
  quantity: number;
}