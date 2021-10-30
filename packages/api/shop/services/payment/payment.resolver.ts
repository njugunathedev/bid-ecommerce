import { Resolver, Arg, Mutation } from 'type-graphql';
import { Payment, PaymentModel } from './payment.type';
import PaymentInput from './payment.input';
@Resolver()
export class PaymentResolver {
  @Mutation(() => Payment, { description: 'Charge a Payment' })
  async charge(@Arg('paymentInput') paymentInput: PaymentInput): Promise<Payment> {
    try {
      const newPayment = new PaymentModel({ ...paymentInput });
      const payment = await newPayment.save();
      //this.items.push(orderInput);
      //add to db
      return payment;
      
      
    } catch (error) {
      console.log(error);
      process.exit(1);
      
    }
  }
}
