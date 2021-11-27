import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectType, Field, Int } from 'type-graphql';
import { Product } from '../../../shop/services/product/product.type';
@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Products {
  @prop()
  @Field(type => [Product])
  items: Product[];

  @prop()
  @Field(type => Int)
  totalCount: number;

  @prop()
  @Field()
  hasMore: boolean;
}
//export const ProductsModel = getModelForClass(Products, { schemaOptions: { timestamps: true } });