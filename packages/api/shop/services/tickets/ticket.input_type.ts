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
    
    @Field()
    userId: string;



}
export default TicketInput;
