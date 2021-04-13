import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({ where: { name } });
    return product;
  }
}

export default ProductsRepository;
