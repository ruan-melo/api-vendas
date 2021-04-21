import { Request, Response } from 'express';
import CreateCustomerService from '../services/customers/CreateCustomerService';
import DeleteCustomerService from '../services/customers/DeleteCustomerService';
import ListCustomerService from '../services/customers/ListCustomerService';
import ShowCustomerService from '../services/customers/ShowCustomerService';
import UpdateCustomerService from '../services/customers/UpdateCustomerService';

class CustomersController {
  async index(req: Request, res: Response): Promise<Response> {
    const listCustomer = new ListCustomerService();

    const customers = await listCustomer.execute();

    return res.status(200).json(customers);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute(id);

    return res.status(200).json(customer);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({ name, email });

    return res.status(201).json(customer);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({ id, name, email });

    return res.status(200).json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute(id);

    return response.status(204).json([]);
  }
}

export default CustomersController;
