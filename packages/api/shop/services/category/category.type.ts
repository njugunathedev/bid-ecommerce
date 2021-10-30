import { ObjectType, Field, Int } from 'type-graphql';
import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export default class Category {
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
  @Field(type => String)
  slug: string;
}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } });
