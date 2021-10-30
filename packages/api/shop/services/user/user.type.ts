import { ObjectType, Field, Int, ID } from 'type-graphql';
import Address from './address.type';
import Contact from './contact.type';
import Card from './card.type';
import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export default class User {
  @prop()
  @Field(type => ID)
  id: number;

  @prop()
  @Field()
  name: string;

  @prop()
  @Field()
  email: string;

  @prop()
  @Field(type => [Address])
  address: Address[];

  @prop()
  @Field(type => [Contact])
  contact: Contact[];

  @prop()
  @Field(type => [Card])
  card: Card[];
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });