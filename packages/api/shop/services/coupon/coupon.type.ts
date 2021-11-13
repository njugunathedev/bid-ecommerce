import { prop } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Coupon {
  
  @prop()
  @Field()
  id: number;

  @prop()
  @Field()
  code: string;

  @prop()
  @Field({ nullable: true })
  image?: string;

  @prop()
  @Field()
  discountInPercent: number;
}
