import { Resolver, Query, Arg, Int, ID, Mutation } from 'type-graphql';
import loadOrders from './order.sample';
import { OrderModel, Order } from './order.type';
import { filterOrder } from '../../helpers/filter';
import { take } from 'lodash';
import AddOrderInput from './order.input_type';
import { type } from 'os';

@Resolver()
export class OrderResolver {
  private readonly items: Order[] = loadOrders();

  @Query(() => [Order], { description: 'Get all the Orders' })
  async orders(
    @Arg('user', type => String) user: string,
    @Arg('text', type => String, { nullable: true }) text: string,
    @Arg('limit', type => Int, { defaultValue: 7 }) limit: number
  ): Promise<Order[]> {
    // return await take(this.items.filter(item => item.userId === user), limit);
    const filter: any = { userId: user };
    if (text) {
      filter.text = { $regex: text, $options: 'i' };
    }
    return await OrderModel.find(filter).limit(limit); 


  }

  @Query(() => Order, { description: 'Get single order' })
  async order(@Arg('id', type => String) id: string): Promise<Order | undefined> {
    const order = await OrderModel.findOne({ id });
    if (order) {
      return order
    }
    else {
      return undefined
    }
  }

  @Mutation(() => Order, { description: 'Add an Order' })
  async addOrder(@Arg('orderInput') orderInput: AddOrderInput): Promise<Order> {
    try {
      const newOrder = new OrderModel({ ...orderInput });
      const order = await newOrder.save();
      //this.items.push(orderInput);
      //add to db
      return order;


    } catch (error) {
      console.log(error);
      process.exit(1);

    }




  }
}
