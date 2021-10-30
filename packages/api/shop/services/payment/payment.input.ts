import { InputType, Field } from 'type-graphql';

@InputType()
export default class PaymentInput {

  @Field(type => String)
  amount: number;

  
  @Field(type => String)
  token: string

  @Field(type => String)
  status: number 
}
