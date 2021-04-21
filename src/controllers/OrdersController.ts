import { Request, Response } from 'express';
import CreateOrderService from '../services/orders/CreateOrderService';
import ShowOrderService from '../services/orders/ShowOrderService';

class OrdersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;
    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return res.status(201).json(order);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showOrder = new ShowOrderService();
    const order = await showOrder.execute(id);

    return res.status(201).json(order);
  }
}

export default OrdersController;
