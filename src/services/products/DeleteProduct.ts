import { getCustomRepository } from 'typeorm';
import RedisCache from '../../cache/RedisCache';
import AppError from '../../errors/AppError';
import ProductsRepository from '../../repositories/ProductsRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
