// a controller should have 5 methods max: index, show, create, update, delete
// if you feel the need of creating more than this 5 ones, you probably should create another controller

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {
    const UpdateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await UpdateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(classToClass(user));
  }

}