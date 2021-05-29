import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowProfileService from '@modules/teachers/services/ShowProfileService';
import UpdateProfileService from '@modules/teachers/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileService);

    const teacher = await showProfile.execute({ id });

    return response.json(teacher);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { whatsapp, biography, subject_id, cost, schedules } = request.body;

    const updateTeacher = container.resolve(UpdateProfileService);

    const teacher = await updateTeacher.execute({
      user_id,
      whatsapp,
      biography,
      subject_id,
      cost,
      schedules,
    });

    return response.json({ teacher: classToClass(teacher) });
  }
}
