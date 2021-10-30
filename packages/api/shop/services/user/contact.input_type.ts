import { InputType, Field } from 'type-graphql';

@InputType()
export default class Contact {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  number: string;
}
