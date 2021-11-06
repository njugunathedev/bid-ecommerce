import { type } from 'os';
import { InputType, Field, Int, ID } from 'type-graphql';


@InputType({ description: "Address Input" })
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
@InputType({ description: "Card Input" })
class CardInput {
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
@InputType({ description: "Contact Input" })
class ContactInput {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  number: string;
}

@InputType({ description: 'User input type' })
export default class UserInput {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field(type=>String, {nullable:true})
  password: string;

  @Field()
  email: string;

  @Field(type => [AddressInput], { nullable: true })
  address: AddressInput;


  @Field(type => [ContactInput], { nullable: true })
  contact: ContactInput;

  @Field(type => [CardInput], { nullable: true })
  card: CardInput;
}


