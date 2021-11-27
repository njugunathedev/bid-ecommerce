import { Resolver, Query, Arg, Int, ObjectType, Mutation, Args } from 'type-graphql';
import { createProductSamples } from './product.sample';
import { Product, ProductResponse, ProductModel } from './product.type';
import { filterItems, getRelatedItems } from '../../helpers/filter';
import { TicketInput } from '../tickets/ticket.input_type';

@Resolver()
export class ProductResolver {
  private readonly items: Product[] = createProductSamples();

  @Query({ description: 'Get all the products' })
  products(
    @Arg('limit', (type) => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', (type) => Int, { defaultValue: 0 }) offset: number,
    @Arg('type', { nullable: true }) type?: string,
    @Arg('text', { nullable: true }) text?: string,
    @Arg('category', { nullable: true }) category?: string
  ): ProductResponse {
    const total = this.items.length;
    const filteredData = filterItems(
      this.items,
      limit,
      offset,
      text,
      type,
      category
    );
    return new ProductResponse({
      total: total,
      ...filteredData,
    });
  }

  @Query(() => Product)
  async product(
    @Arg('slug', (type) => String) slug: string
  ): Promise<Product | undefined> {
    return await this.items.find((item) => item.slug === slug);
  }

  @Query(() => [Product], { description: 'Get the Related products' })
  async relatedProducts(
    @Arg('slug', (slug) => String) slug: string,
    @Arg('type', { nullable: true }) type?: string
  ): Promise<any> {
    const relatedItem = await getRelatedItems(type, slug, this.items);
    return relatedItem;
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
    
    if(product.ticket){
      product.ticket.push(ticket);
    }
    if(!product.ticket){
      product.ticket = [ticket];
    }

    const result = await product.save();
    return result;
    

  }


}
