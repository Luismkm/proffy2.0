import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateTeacherAvatarService from '@modules/teachers/services/UpdateTeacherAvatarService';

export default class TeacherAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateTeacherAvatar = container.resolve(UpdateTeacherAvatarService);

    const teacher = await updateTeacherAvatar.execute({
      teacher_id: request.teacher.id,

      avatarFilename: request.file.filename,
    });

    return response.json(teacher);
  }
}
