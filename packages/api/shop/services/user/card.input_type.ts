import { InputType, Field } from 'type-graphql';

@InputType()
export default class Card {
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
