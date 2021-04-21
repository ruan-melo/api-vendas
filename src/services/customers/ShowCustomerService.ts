import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Customer from '../../models/Customer';
import CustomersRepository from '../../repositories/CustomersRepository';

class ShowCustomerService {
  async execute(user_id: string): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(user_id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
