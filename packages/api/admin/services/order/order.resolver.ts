import { Resolver, Query, Arg, Int, Mutation, ID } from "type-graphql";
import loadOrders from "../../data/order.data";
import { Order, OrderModel } from "../../../shop/services/order/order.type";
import search from "../../helpers/search";
@Resolver()
export default class OrderResolver {
  //private readonly ordersCollection: Order[] = loadOrders();

  @Query(returns => [Order], { description: "Get all the Orders" })
  async orders(
    @Arg("status", type => String, { nullable: true }) status: string,
    @Arg("limit", type => Int, { defaultValue: 50 }) limit: number,
    @Arg("searchText", type => String, { defaultValue: "" }) searchText: string
  ): Promise<Order[] | undefined> {
    let orders = OrderModel.find({});
    if (status) {
      orders = await orders.filter(orders, { status });
    }
    //limit the number of orders returned
    orders = orders.limit(limit);
    if (searchText) {
      orders = await orders.search(searchText);
    }
    if(orders){

      return orders;
    }
    else{
      return undefined
    }
  }

  @Query(returns => Order, { description: "Get single order" })
  async order(@Arg("id", type => ID) id: string): Promise<Order | undefined> {
    const order = await OrderModel.findOne({ id: id });
    if(order){
      return order 
    }
    else{
      return undefined
    }
  }

  // @Mutation(returns => Order, { description: 'Add an Order' })
  // async addOrder(@Arg('orderInput') orderInput: Order): Promise<Order> {
  //   console.log(orderInput, 'orderinput');
  //   return await orderInput;
  // }
}
