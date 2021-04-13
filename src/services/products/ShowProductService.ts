import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import ProductsRepository from '../../repositories/ProductsRepository';

class ShowProductService {
  public async execute(id: string): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}

export default ShowProductService;
