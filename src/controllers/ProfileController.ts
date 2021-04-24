import { Request, Response } from 'express';
import UpdateProfileService from '../services/users/UpdateProfileService';
import ShowProfileService from '../services/users/ShowProfileService';
import { classToClass } from 'class-transformer';

class ProfileController {
  async show(req: Request, res: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user = await showProfile.execute(req.user.id);

    return res.json(classToClass(user));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;
    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id: req.user.id,
      name,
      email,
      password,
      old_password,
    });

    return res.json(classToClass(user));
  }
}

export default ProfileController;
