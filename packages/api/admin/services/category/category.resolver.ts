import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql';
import loadCategories from '../../data/category.data';
import { Category, CategoryModel } from '../../../shop/services/category/category.type'
import { AddCategoryInput } from './category.input_type';
import search from '../../helpers/search';
@Resolver()
export default class CategoryResolver {
  //private readonly categoriesCollection: Category[] = loadCategories();

  @Query(returns => [Category], { description: 'Get all the categories' })
  async categories(
    @Arg('type', { nullable: true }) type?: string,
    @Arg('searchBy', { defaultValue: '' }) searchBy?: string
  ): Promise<Category[]> {
    
    var categories = await CategoryModel.find({});
    if (type) {
      categories = await CategoryModel.find({ type });
    }
    

    if(categories){
      return categories;
    }
    else{
      return [];
    }
  }

  @Query(returns => Category)
  async category(
    @Arg('id', type => ID) id: string
  ): Promise<Category | undefined> {
    let category = await CategoryModel.findOne({ id });
    if(category){
      return category
    }
    else{
      return undefined
    }
  }

  @Mutation(() => Category, { description: 'Create Category' })
  async createCategory(
    @Arg('category') categoryInput: AddCategoryInput
  ): Promise<Category> {
    try {
      const newCategory = new CategoryModel({ ...categoryInput });
      const category = await newCategory.save();
      //this.items.push(orderInput);
      //add to db
      return category;
      
      
    } catch (error) {
      console.log(error);
      process.exit(1);
      
    }
  }
}
