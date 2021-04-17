import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

interface Params {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  async execute({ user_id, avatarFilename }: Params): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
