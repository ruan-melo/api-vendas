import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Order from '../../models/Order';
import OrdersRepository from '../../repositories/OrdersRepository';

class ShowOrderService {
  public async execute(id: string): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}

export default ShowOrderService;
