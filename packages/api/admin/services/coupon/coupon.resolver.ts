import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import loadCoupons from '../../data/coupon.data';
import { Coupon, CouponModel } from './coupon.type';
import AddCouponInput from './coupon.input_type';
import search from '../../helpers/search';
@Resolver()
export default class CouponResolver {
  //private readonly couponsCollection: Coupon[] = loadCoupons();

  @Query(returns => [Coupon], { description: 'Get All Coupons' })
  async coupons(
    @Arg('status', { nullable: true }) status?: string,
    @Arg('searchBy', { nullable: true }) searchBy?: string
  ): Promise<Coupon[] | undefined> {
    let coupons = CouponModel.find();
    if (status) {
      coupons = CouponModel.find({ status });
    }
    return await search(coupons, ['title', 'code'], searchBy);
  }

  @Mutation(returns => Coupon)
  async createCoupon(
    @Arg('coupon') coupon: AddCouponInput
  ): Promise<Coupon | undefined> {
    const newCoupon = new CouponModel({...AddCouponInput});
    return await newCoupon.save();

   
  }
}
