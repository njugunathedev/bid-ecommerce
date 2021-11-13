import { ObjectType, InputType, Field, ID } from 'type-graphql';

@ObjectType()
export class Gallery {
  @Field(type => ID)
  id: string;

  @Field()
  url: string;
}
@InputType()
export class GalleryInput {
  @Field()
  id: string;
  
  @Field()
  url: string;
}
