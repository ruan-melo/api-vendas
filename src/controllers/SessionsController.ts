import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionService from '../services/users/CreateSessionService';

class SessionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = new CreateSessionService();

    const session = await createSession.execute({ email, password });

    return res.json(classToClass(session));
  }
}

export default SessionsController;
