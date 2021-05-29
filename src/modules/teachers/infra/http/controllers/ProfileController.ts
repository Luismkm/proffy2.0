import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/teachers/services/ShowProfileService';
import UpdateProfileService from '@modules/teachers/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const teacher_id = request.teacher.id;

    const showProfile = container.resolve(ShowProfileService);

    const teacher = await showProfile.execute({ teacher_id });

    return response.json(teacher);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const teacher_id = 'd71f7a72-9e06-4fdd-8950-bac8cf3f0cf1';

    const { whatsapp, biography, subject_id, cost, schedules } = request.body;

    const updateTeacher = container.resolve(UpdateProfileService);

    const teacher = await updateTeacher.execute({
      teacher_id,
      whatsapp,
      biography,
      subject_id,
      cost,
      schedules,
    });

    return response.json(teacher);
  }
}
