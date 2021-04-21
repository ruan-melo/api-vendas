import { EntityRepository, Repository } from 'typeorm';
import Customer from '../models/Customer';
import Order from '../models/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface CreateOrderData {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({
    customer,
    products,
  }: CreateOrderData): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

export default OrdersRepository;
