import { Resolver, Query, Arg, Int, ObjectType, Mutation } from 'type-graphql';
import { Ticket, TicketModel } from './ticket.type';
import TicketInput from './ticket.input_type';
@Resolver()
export class TickerResolver {


    @Query(() => Ticket, { description: 'Get single order' })
    async ticket(@Arg('id', type => String) id: string): Promise<Ticket | undefined> {
        const ticket = await TicketModel.findOne({ id });
        if (ticket) {
            return ticket
        }
        else {
            return undefined
        }
    }
    @Query(() => [Ticket], { description: 'Get all orders' })
    async tickets(
        @Arg('userId', type => String) userId: string,
        @Arg('text', type => String, { nullable: true }) text: string,
        @Arg('limit', type => Int, { defaultValue: 7 }) limit: number
    ): Promise<Ticket[]> {
        const filter: any = { userId };
        if (text) {
            filter.text = { $regex: text, $options: 'i' };
        }
        return await TicketModel.find(filter).limit(limit);

    }


    @Mutation(() => Ticket, { description: 'Add an Ticket' })
    async addTicket(@Arg('ticketInput') ticketInput: TicketInput): Promise<Ticket> {
        try {
            const newTicket = new TicketModel({ ...ticketInput });
            const ticket = await newTicket.save();
            //this.items.push(ticketInput);
            //add to db
            return ticket;


        } catch (error) {
            console.log(error);
            process.exit(1);

        }




    }
}
