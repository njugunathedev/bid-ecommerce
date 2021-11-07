import { ObjectType, Field, Int, ID } from 'type-graphql';

import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';
import { type } from 'os';


@ObjectType()
class Card {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  cardType: string;

  @Field()
  lastFourDigit: number;
}

@ObjectType()
class Address {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  info: string;
}
@ObjectType()
class Contact {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  number: string;
}

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class User {
  @prop()
  @Field(type => ID)
  id: string;

  @prop()
  @Field(type => String, { nullable: true })
  password: string;

  @prop()
  @Field()
  name: string;

  @prop()
  @Field()
  email: string;

  @prop()
  @Field(type => String)
  image: string;

  @prop()
  @Field(type => [Address])
  address: Address[];

  @prop()
  @Field(type => [Contact])
  contact: Contact[];

  @prop()
  @Field(type => [Card])
  card: Card[];

  @prop()
  @Field({ nullable: true })
  created_date: Date;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });