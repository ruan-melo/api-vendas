import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Customer from '../../models/Customer';
import CustomersRepository from '../../repositories/CustomersRepository';

interface UpdateCustomerData {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  async execute({ id, name, email }: UpdateCustomerData): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email', 409);
    }

    customer.name = name;
    customer.email = email;
    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
