import { ObjectType, Field, ID } from 'type-graphql';
import { ProductType } from './product.enum';
import Category from '../category/category.type';
import Gallery from './gallery.type';
import PaginatedResponse from '../../helpers/paginated-response';
import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';
import { Ticket } from '../tickets/ticket.type';

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Meta {
  @prop()
  @Field()
  publisher: string;

  @prop()
  @Field()
  isbn: string;

  @prop()
  @Field()
  edition: string;

  @prop()
  @Field()
  country: string;

  @prop()
  @Field(() => [String])
  languages: string[];

  @prop()
  @Field()
  numberOfReader: string;

  @prop()
  @Field()
  numberOfPage: string;

  @prop()
  @Field()
  samplePDF: string;
}
export const MetaModel = getModelForClass(Meta);

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Social {
  @prop()
  @Field(() => ID)
  id: string;

  @prop()
  @Field()
  media: string;

  @prop()
  @Field()
  profileLink: string;
}
export const SocialModel = getModelForClass(Social);


@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Author {
  @prop()
  @Field(() => ID)
  id: string;

  @prop()
  @Field()
  name: string;

  @prop()
  @Field()
  avatar: string;

  @prop()
  @Field()
  bio: string;

  @prop()
  @Field()
  email: string;

  @prop()
  @Field()
  website: string;

  @prop()
  @Field(() => [Social])
  socials: Social[];
}
export const AuthorModel = getModelForClass(Author);

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export default class Product {
  @prop()
  @Field()
  id: number;

  @prop()
  @Field()
  slug: string;

  @prop()
  @Field()
  title: string;

  @prop()
  @Field(() => ProductType)
  type: ProductType;

  @prop()
  @Field(() => [Category])
  categories: Category[];

  @prop()
  @Field()
  unit: string;

  @prop()
  @Field()
  image: string;

  @prop()
  @Field(() => [Gallery])
  gallery: Gallery[];

  @Field()
  description: string;

  @prop()
  @Field()
  price: number;

  @prop()
  @Field()
  salePrice: number;

  @prop()
  @Field()
  discountInPercent: number;

  @prop()
  @Field(() => Author, { nullable: true })
  author?: Author;

  @prop()
  @Field(() => Meta, { nullable: true })
  meta?: Meta;

  @prop()
  @Field(() => Ticket, { nullable: true })
  ticket?: Ticket;

  @prop()
  @Field()
  createdAt: Date;
}

// TODO: Need to change this in next update

// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
export class ProductResponse extends PaginatedResponse(Product) {
  // simple helper for creating new instances easily
  constructor(productResponse: ProductResponse) {
    super();
    Object.assign(this, productResponse);
  }

  // you can add more fields here if you need
}



export const ProductModel = getModelForClass(Product, { schemaOptions: { timestamps: true } });