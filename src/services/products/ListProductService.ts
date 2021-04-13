import { getCustomRepository } from 'typeorm';
import Product from '../../models/Product';
import ProductsRepository from '../../repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();

    return products;
  }
}

export default ListProductService;
