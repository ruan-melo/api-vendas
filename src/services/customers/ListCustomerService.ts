import { getCustomRepository } from 'typeorm';
import Customer from '../../models/Customer';
import CustomersRepository from '../../repositories/CustomersRepository';

class ListCustomerService {
  async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = await customersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
