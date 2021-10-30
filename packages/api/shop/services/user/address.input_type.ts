import { InputType, Field } from 'type-graphql';

@InputType()
export default class Address {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  info: string;
}
