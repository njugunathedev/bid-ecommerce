import { ObjectType, Field, Int, ID } from 'type-graphql';

import { prop, getModelForClass, modelOptions, Severity} from '@typegoose/typegoose';
import { type } from 'os';

@modelOptions({ options: { allowMixed : Severity.ALLOW} })
@ObjectType()
export class Ticket {
    @prop()
    @Field(() => ID)
    id: string;

    @prop()
    @Field()
    roundNumber: string;

    @prop()
    @Field()
    ticketNumber: string;

    @prop()
    @Field()
    ticketType: string;

    @prop()
    @Field({ nullable: true })
    ticketStatus: string;

    @prop()
    @Field(() => Int, { nullable: true })
    price: number;
    

    @prop()
    @Field()
    userId: string;


}
export const TicketModel = getModelForClass(Ticket, { schemaOptions: { timestamps: true } });