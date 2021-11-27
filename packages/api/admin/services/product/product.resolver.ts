import { Resolver, Query, Arg, Args, Mutation } from 'type-graphql';
import loadProducts from '../../data/product.data';

import { Products } from './products.type';
import GetProductsArgs from './product.args_type';
import AddProductInput from './product.input_type';
import search from '../../helpers/search';
import shuffle from '../../helpers/shuffle';
import { ProductModel, Product } from '../../../shop/services/product/product.type';
import { sortByHighestNumber, sortByLowestNumber } from '../../helpers/sorts';
@Resolver()
export default class ProductResolver {
  //private readonly productsCollection: Product[] = loadProducts();

  @Query(() => Products, { description: 'Get all the products' })
  async products(
    @Args()
    { limit, offset, sortByPrice, type, searchText, category }: GetProductsArgs
  ): Promise<Products> {
    let products = await ProductModel.find({});
    if (category) {
      products = await ProductModel.find({ slug: category });
    }
    if (type) {
      products = await ProductModel.find({ type });
    
    }
    if (sortByPrice) {
      if (sortByPrice === 'highestToLowest') {
        products = sortByHighestNumber(products, 'price');
      }
      if (sortByPrice === 'lowestToHighest') {
        products = sortByLowestNumber(products, 'price');
      }
    } else {
      products = shuffle(products);
    }

    // return await products.slice(0, limit);
    products = await search(products, ['name'], searchText);
    const hasMore = products.length > offset + limit;
    if (products) {
      
      return {
        items: products.slice(offset, offset + limit),
        totalCount: ProductModel.length,
        hasMore,
      };

    }
    else{
      return {
        items: [],
        totalCount: 0,
        hasMore: false,
      };
    }
   
  }

  @Query(() => Product, { description: 'Get a single product' })
  async product(@Arg('slug') slug: string): Promise<Product | undefined> {
    const product = await ProductModel.findOne({ slug });
    if(product){
      return product;
    }
    return undefined;
  }

  @Mutation(() => Product, { description: 'Create Product' })
  async createProduct(
    @Arg('product') productInput: AddProductInput): Promise<Product> {
    console.log(productInput, 'product');

    const newProduct = new ProductModel({ ...productInput });
    const product = await newProduct.save();
    return product;
  }
}
