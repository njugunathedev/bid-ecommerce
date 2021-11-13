import { Field, ID, Int, ObjectType } from 'type-graphql';
import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Product } from '../../../shop/services/product/product.type';

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Coupon {

  @prop()
  @Field(type => ID)
  id: string;

  @prop()
  @Field()
  title: string;

  @prop()
  @Field(type => Int)
  number_of_coupon: number;

  @prop()
  @Field(type => Int, { defaultValue: 0 })
  number_of_used_coupon?: number;

  @prop()
  @Field(type => Int)
  discount_in_percent: number;

  @prop()
  @Field()
  category: string;

  @prop()
  @Field(type => [Product], { nullable: true })
  products: Product[];

  @prop()
  @Field()
  code: string;
  
  @Field(type => Int, { defaultValue: 0 })
  minimum_amount: number;

  @Field({ defaultValue: 'active' })
  status: string;

  @Field({ nullable: true })
  expiration_date?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creation_date: Date;
}
export const CouponModel = getModelForClass(Coupon);