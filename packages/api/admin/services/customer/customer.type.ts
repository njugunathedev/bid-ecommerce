import { Field, ObjectType, Int } from 'type-graphql';
import { User } from '../../../shop/services/user/user.type';
import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';
@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Customer extends User {
  @prop()
  @Field({ defaultValue: false })
  has_blocked: boolean;

  @prop()
  @Field(type => Int, { nullable: true })
  total_order?: number;

  @prop()
  @Field(type => Int, { nullable: true })
  total_order_amount?: number;

  @prop()
  @Field({ defaultValue: 'silver' })
  rank?: string;
}
export const CustomerModel = getModelForClass(Customer);
