import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Customer from '../../models/Customer';
import CustomersRepository from '../../repositories/CustomersRepository';

interface Params {
  name: string;
  email: string;
}

class CreateCustomerService {
  async execute({ name, email }: Params): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used', 409);
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
