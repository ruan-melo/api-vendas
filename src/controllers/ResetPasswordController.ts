import { Request, Response } from 'express';
import ResetPasswordService from '../services/users/ResetPasswordService';

class ResetPasswordController {
  async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;
    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ password, token });

    return res.status(204).json();
  }
}

export default ResetPasswordController;
