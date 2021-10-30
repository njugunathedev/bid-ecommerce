import { ObjectType, Field } from 'type-graphql';
import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Payment {
  @prop()
  @Field(type => String)
  amount: number;

  @prop()
  @Field(type => String)
  token: string

  @prop()
  @Field(type => String)
  status: number 
}

export const PaymentModel = getModelForClass(Payment, { schemaOptions: { timestamps: true } });