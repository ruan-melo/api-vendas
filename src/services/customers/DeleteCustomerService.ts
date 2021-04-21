import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import CustomersRepository from '../../repositories/CustomersRepository';

class DeleteCustomerService {
  async execute(user_id: string): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(user_id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
