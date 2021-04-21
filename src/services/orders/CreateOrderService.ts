import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Order from '../../models/Order';
import CustomersRepository from '../../repositories/CustomersRepository';
import OrdersRepository from '../../repositories/OrdersRepository';
import ProductsRepository from '../../repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface Params {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  async execute({ customer_id, products }: Params): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository); //Carrega os repositórios
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customersRepository.findById(customer_id); //Procura o cliente no DB

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id', 404); //Checa se o cliente foi encontrado
    }

    const existsProducts = await productsRepository.findAllByIds(products); //Pega todos os itens no database

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids', 404); //Verifica se foi encontrado algum produto;
    }

    const existsProductsIds = existsProducts.map(product => product.id); //Pega somente os Ids dos produtos encontrados no DB.

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id), // Verifica se algum produto não foi encontrado.
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0]}`, //Checa e lança erro dizendo que o produto não foi encontrado.
        404,
      );
    }

    const quantityNotAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity < //Verifica se a quantidade de algum dos produtos não é suficiente.
        product.quantity,
    );

    if (quantityNotAvailable.length) {
      //Checa se há produtos com quantidade insuficiente e lança o erro.
      throw new AppError(
        `The quantity ${quantityNotAvailable[0].quantity} is not available for ${quantityNotAvailable[0].id}`,
        409,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price, //Cria os objetos de produto incluindo o preço do DB
    }));

    const order = await ordersRepository.createOrder({
      //Cria a entidade Order.
      customer: customerExists,
      products: serializedProducts /*Não é obrigado passar os campos completos de Products
      no método createOrder há o link necessário para criar a order passando os valores de product_id, quantity e price para o
      atributo order_products que automaticamente recebe esses valores e cria um Order_Product para cada.
      e o atributo order_products precisa do product_id para sua chave estrangeira

      */,
    });

    const { order_products } = order; //Como a quantidade de produtos disponíveis será alterada, preciso pegar os order_products criados para ter as informações

    const updatedProductQuantity = order_products.map(product => ({
      //Com as informações do Order_product do Order ja é possível ter o ID e posso criar um objeto alterando a quantidade.
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity); // Recebe um array de objetos {id: string , quantity: number} e ao identificar o id já existente no DB, apenas faz o update.

    return order;
  }
}

export default CreateOrderService;
