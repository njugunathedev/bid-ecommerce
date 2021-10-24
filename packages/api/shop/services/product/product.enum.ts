import { registerEnumType } from 'type-graphql';

export enum ProductType {
  BOOK = 'smartphones',
  BAGS = 'gaming',
  GROCERY = 'computing',
  HOME = 'home',
  MEDICINE = 'medicine',
  FOOD = 'food',
  CLOTH = 'cloth',
  CLOTHING = 'bluetooth-speakers',
  FURNITURE = 'cameras',
  MAKEUP = 'computers'
}

registerEnumType(ProductType, {
  name: 'ProductType',
  description: 'The basic product types'
});
