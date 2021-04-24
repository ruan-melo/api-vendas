import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/users/UpdateUserAvatarService';

class UsersAvatarController {
  async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.status(200).json(classToClass(user));
  }
}

export default UsersAvatarController;
