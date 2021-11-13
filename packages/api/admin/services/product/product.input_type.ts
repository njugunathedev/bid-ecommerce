import { NotNumberTypeError } from '@typegoose/typegoose/lib/internal/errors';
import { InputType, Field, ID, Int, Float } from 'type-graphql';
import { Product } from '../../../shop/services/product/product.type';
import { AddCategoryInput } from '../category/category.input_type';
import { ProductType } from '../../../shop/services/product/product.enum';
import TicketInput from '../../../shop/services/tickets/ticket.input_type'
import { GalleryInput } from '../../../shop/services/product/gallery.type';


@InputType()
export class MetaInput {
  @Field(type => ID)
  id: string;

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
export class SocialInput {
  
  @Field(() => ID)
  id: string;

  
  @Field()
  media: string;

  
  @Field()
  profileLink: string;
}




@InputType()
export class AuthorInput {
  
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

  
  @Field(() => [SocialInput])
  socials: SocialInput[];
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

  
  @Field(() => [AddCategoryInput])
  categories: AddCategoryInput[];

  
  @Field()
  unit: string;

  
  @Field()
  image: string;

  

  @Field(type => [GalleryInput], { nullable: true })
  gallery: GalleryInput[];

  @Field()
  description: string;

  
  @Field()
  price: number;

  
  @Field()
  salePrice: number;

  
  @Field()
  discountInPercent: number;

  
  @Field(() => AuthorInput, { nullable: true })
  author?: AuthorInput;

  
  @Field(() => MetaInput, { nullable: true })
  meta?: MetaInput;

  
  @Field(() => [TicketInput], { nullable: true })
  ticket?: TicketInput[];

  
  @Field()
  creation_date: Date;

  
  @Field()
  quantity: number;
}