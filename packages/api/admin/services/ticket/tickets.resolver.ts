import { Resolver, Query, Arg, Int, ObjectType, Mutation } from 'type-graphql';
import { Ticket, TicketModel } from '../../../shop/services/tickets/ticket.type';
import TicketInput from '../../../shop/services/tickets/ticket.input_type';
import { TickerResolver } from '../../../shop/services/tickets/ticket.resolver';

@Resolver()
export default class TicketsResolver extends TickerResolver {
    
    @Query(() => [Ticket], { description: 'Get all orders' })
    async getTickets(
        @Arg('text', type => String, { nullable: true }) text: string,
        @Arg('limit', type => Int, { defaultValue: 7 }) limit: number,
        @Arg('status', type => String, { nullable: true }) status: string
    ): Promise<Ticket[] | undefined> {
        let tickets = await TicketModel.find({}).limit(limit);

        if (text) {
            tickets = await TicketModel.find({
                
                userId: { $regex: text, $options: 'i' },
            }).limit(limit);
        }
        if (status) {
            tickets = await TicketModel.find({
                ticketStatus: status
            }).limit(limit);
        }
        if(!tickets) {
            throw new Error('No tickets found');
            return undefined;
        }
        return tickets;

        
        
    


    }
    @Mutation(() => Ticket, { description: 'Close tickets' })
    async closeTicket(
        @Arg('id', type => String) id: string
    ): Promise<Ticket | undefined> {
        const ticket = await TicketModel.findOne({ id });
        if (!ticket) {
            throw new Error('Ticket not found');
            return undefined;
        }
        ticket.ticketStatus = 'closed';
        await ticket.save();
        return ticket;
    }


   
}
