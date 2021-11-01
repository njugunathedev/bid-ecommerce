import { InputType, Field, Int, ID } from 'type-graphql';

import ContactInput from './contact.input_type';
import CardInput from './card.input_type';
@InputType({ description: "Address Input"} )
class AddressInput {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  info: string;
}
@InputType({ description: 'User input type' })
export default class UserInput {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(type => AddressInput)
  address: AddressInput;
  

@Field()
contact: string;

@Field(type => String, { nullable: true })
card: string;
}


