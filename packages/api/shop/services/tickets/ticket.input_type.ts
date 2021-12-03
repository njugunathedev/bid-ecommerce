import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class TicketInput {
    @Field(() => ID)
    id: string;

    @Field()
    roundNumber: string;

    @Field()
    ticketNumber: string;

    @Field()
    ticketType: string;

    @Field({ nullable: true })
    ticketStatus: string;

    @Field(() => Int, { nullable: true })
    price: number;
    
    @Field()
    userId: string;



}
export default TicketInput;
