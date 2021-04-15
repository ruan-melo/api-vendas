import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

interface Params {
  email: string;
  password: string;
}

interface IReturn {
  user: User;
  token: string;
}

class CreateSessionService {
  async execute({ email, password }: Params): Promise<IReturn> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const SECRET_KEY = process.env.SECRET_KEY ? process.env.SECRET_KEY : '';
    const EXPIRES_IN = process.env.EXPIRES_IN ? process.env.EXPIRES_IN : '';

    const token = sign({}, SECRET_KEY, {
      subject: user.id,
      expiresIn: EXPIRES_IN,
    });

    return { user, token };
  }
}

export default CreateSessionService;
