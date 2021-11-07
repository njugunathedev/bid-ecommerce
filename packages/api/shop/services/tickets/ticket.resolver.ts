import { Resolver, Query, Arg, Int, ObjectType, Mutation } from 'type-graphql';
import { Ticket, TicketModel } from './ticket.type';
import TicketInput from './ticket.input_type';
@Resolver()
export class TickerResolver {


    @Query(() => Ticket, { description: 'Get single order' })
    async ticket(@Arg('_id', type => String) _id: string): Promise<Ticket | undefined> {
        const ticket = await TicketModel.findOne({ _id });
        if (ticket) {
            return ticket
        }
        else {
            return undefined
        }
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
