import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
class TicketInput {
    @Field(() => ID)
    _id: string;

    
    @Field()
    roundNumber: string;

    
    @Field()
    ticketNumber: string;

    
    @Field()
    ticketType: string;


}
export default TicketInput;
