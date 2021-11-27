import { registerEnumType } from 'type-graphql';

export enum ProductType {
  SMARTPHONES = 'smartphones',
  GAMING = 'gaming',
  COMPUTING = 'computing',
  HOME = 'home',
  MEDICINE = 'medicine',
  FOOD = 'food',
  CLOTH = 'cloth',
  BLUETOOTH_SPEAKERS = 'bluetooth-speakers',
  CAMERAS = 'cameras',
  COMPUTERS = 'computers'
}

registerEnumType(ProductType, {
  name: 'ProductType',
  description: 'The basic product types'
});
