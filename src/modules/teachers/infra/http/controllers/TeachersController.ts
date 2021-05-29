import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';

export default class TeachersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, whatsapp, biography, subject_id, cost, schedules } =
      request.body;

    const createTeacher = container.resolve(CreateTeacherService);

    const teacherAndSchedule = await createTeacher.execute({
      user_id,
      whatsapp,
      biography,
      subject_id,
      cost,
      schedules,
    });

    return response.json(teacherAndSchedule);
  }
}
