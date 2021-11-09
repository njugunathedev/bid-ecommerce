import { ObjectType, Field, Int } from 'type-graphql';
import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Category {
  @prop()
  @Field(type => Int)
  id: number;

  @prop()
  @Field()
  title: string;

  @prop()
  @Field(type => [Category])
  children: Category[];

  @prop()
  @Field(type => String)
  type: string;

  @prop()
  @Field(type => String)
  icon: string;

  @prop()
  @Field({ defaultValue: 0 })
  number_of_product?: number;

  @prop()
  @Field(type => String)
  slug: string;

  @prop()  
  @Field()
  created_date: Date;
}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } });
