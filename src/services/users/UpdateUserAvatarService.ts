import { getCustomRepository } from 'typeorm';
import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';
import DiskStorageProvider from '../../config/providers/DiskStorageProvider';
import S3StorageProvider from '../../config/providers/S3StorageProvider';

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

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const filename = await s3Provider.saveFile(avatarFilename);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }
      const filename = await diskProvider.saveFile(avatarFilename);
      user.avatar = filename;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
