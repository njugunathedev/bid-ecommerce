import { Resolver, Query, Arg, Int, ObjectType, Mutation, Args } from 'type-graphql';
import { createProductSamples } from './product.sample';
import { Product, ProductResponse, ProductModel } from './product.type';
import { filterItems, getRelatedItems } from '../../helpers/filter';
import { TicketInput } from '../tickets/ticket.input_type';
import GetProductsArgs from '../../../admin/services/product/product.args_type';
import { Products } from '../../../admin/services/product/products.type';
import search from '../../../admin/helpers/search';
import { ProductType } from './product.enum';

@Resolver()
export class ProductResolver {
  //private readonly items: Product[] = createProductSamples();

  @Query(() => Products, { description: 'Get all the products' })
  async products(
    @Args()
    { limit, offset, type, text, category }: GetProductsArgs
  ): Promise<Products> {
    let products = await ProductModel.find({});
    if (category) {
      products = await ProductModel.find({ slug: category });
    }
    if (type) {
      products = await ProductModel.find({ type });

    }


    // return await products.slice(0, limit);
    if (text) {
      products = await ProductModel.find({ title: { $regex: text, $options: 'i' } });
    }
    const hasMore = products.length > offset + limit;
    if (products) {

      return {
        items: products.slice(offset, offset + limit),
        totalCount: ProductModel.length,
        hasMore,
      };

    }
    else {
      return {
        items: [],
        totalCount: 0,
        hasMore: false,
      };
    }

  }

  @Query(() => Product)
  async product(
    @Arg('slug', (type) => String) slug: string
  ): Promise<Product | undefined> {
    let product = await ProductModel.findOne({ slug });
    if (product) {
      return product;


    } else {
      return undefined;

    }
  }

  @Query(() => [Product], { description: 'Get the Related products' })
  async relatedProducts(
    @Arg('type', (type) => String) type: String,
    @Arg('slug', (type) => String) slug: String

  ): Promise<any> {
    const relatedItem = ProductModel.find({ });
    if (relatedItem) {
      return relatedItem;

    } else {
      return undefined;


    }
  }
  // @Mutation(() => Product, { description: 'Create Category' })
  // async createProduct(
  //   @Arg('product') product: AddProductInput
  // ): Promise<Product> {
  //   console.log(product, 'product');

  //   const newProduct = new ProductModel({ ...AddProductInput });
  //   const result = await newProduct.save();
  //   return result;
  // }

  @Mutation(() => Product, { description: 'Update Product' })
  async updateProduct(
    @Arg('id', (id) => String) id: string,
    @Arg('ticket') ticket: TicketInput
  ): Promise<Product> {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.ticket) {
      product.ticket.push(ticket);
    }
    if (!product.ticket) {
      product.ticket = [ticket];
    }

    const result = await product.save();
    return result;


  }


}
