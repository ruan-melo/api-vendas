import { getCustomRepository } from 'typeorm';
import Customer from '../../models/Customer';
import CustomersRepository from '../../repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Array<Customer>;
}

class ListCustomerService {
  async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
