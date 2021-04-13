import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import ProductsRepository from '../../repositories/ProductsRepository';

interface Params {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: Params): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const prodExists = productsRepository.findByName(name);
    if (!prodExists) {
      throw new AppError('There is already a product with this name;', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
