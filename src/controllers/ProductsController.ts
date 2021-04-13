import { Request, Response } from 'express';
import Product from '../models/Product';
import CreateProductService from '../services/products/CreateProductService';
import DeleteProductService from '../services/products/DeleteProduct';
import ListProductService from '../services/products/ListProductService';
import ShowProductService from '../services/products/ShowProductService';
import UpdateProductService from '../services/products/UpdateProductService';

class ProductsController {
  async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.status(200).json(products);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute(id);

    return res.status(200).json(product);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return res.status(201).json(product);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return res.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute(id);

    return response.status(204).json([]);
  }
}

export default ProductsController;
