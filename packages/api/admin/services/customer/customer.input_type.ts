import { InputType, Field, ID } from 'type-graphql';
import { Customer } from './customer.type';
import AddAddressInput from '../user/address/address.input_type';
import AddCardInput from '../user/card/card.input_type';
import AddContactInput from '../user/contact/contact.input_type';

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


@InputType({ description: 'New customer data' })
export class AddCustomerInput implements Partial<Customer> {
  


  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field(type=>String, {nullable:true})
  password: string;

  @Field()
  email: string;

  @Field(type => String, {nullable:true})
  image: string;

  @Field(type => [AddressInput])
  address: AddressInput[];


  @Field(type => [ContactInput], { nullable: true })
  contact: ContactInput[];

  @Field(type => [CardInput], { nullable: true })
  card: CardInput[];

  @Field()
  creation_date: Date;

  @Field({ defaultValue: false })
  has_blocked: boolean;

  @Field({ defaultValue: 'silver' })
  rank: string;
}
