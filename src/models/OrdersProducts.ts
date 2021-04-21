import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Customer from './Customer';

import Order from './Order';
import Product from './Product';

@Entity('orders_products')
class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.order_products) // Tipo, Função que retorna a propriedade de configuração no lado inverso, options
  @JoinColumn({ name: 'product_id' }) //Algumas opções, por padrão iria criar a coluna productId na tabela.
  product: Product;

  @Column('uuid')
  order_id: string;

  @Column('uuid')
  product_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderProducts;
