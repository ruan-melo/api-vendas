import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import ProductsRepository from '../../repositories/ProductsRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
