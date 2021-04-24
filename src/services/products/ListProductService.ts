import { getCustomRepository } from 'typeorm';
import Product from '../../models/Product';
import ProductsRepository from '../../repositories/ProductsRepository';
import RedisCache from '../../cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save({
        key: 'api-vendas-PRODUCT_LIST',
        value: products,
      });
    }

    await redisCache.save({ key: 'teste', value: 'teste' });

    return products;
  }
}

export default ListProductService;
