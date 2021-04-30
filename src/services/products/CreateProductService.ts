import { getCustomRepository } from 'typeorm';
import redisCache from '../../cache/RedisCache';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import ProductsRepository from '../../repositories/ProductsRepository';

interface Params {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  async execute({ name, price, quantity }: Params): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const prodExists = await productsRepository.findByName(name);
    if (prodExists) {
      throw new AppError('There is already a product with this name;', 409);
    }

    const product = productsRepository.create({ name, price, quantity });

    //const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
