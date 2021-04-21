import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

interface UpdateProfileData {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: UpdateProfileData): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const dbUser = await usersRepository.findByEmail(email);

    if (dbUser && dbUser.id !== user.id) {
      throw new AppError('There is already one user with this email', 409);
    }

    if (password && !old_password) {
      throw new AppError('Old password is required', 400);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password does not match', 409);
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
