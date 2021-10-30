import { InputType, Field, Int, ID } from 'type-graphql';
import AddressInput from './address.input_type';
import ContactInput from './contact.input_type';
import CardInput from './card.input_type';

@InputType({ description: 'User input type' })
export default class User {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(type => [AddressInput])
  address: AddressInput[];

  @Field(type => [ContactInput])
  contact: ContactInput[];

  @Field(type => [CardInput])
  card: CardInput[];
}
