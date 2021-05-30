import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import convertHourToMinutes from '@shared/utils/convertHourToMinutes';
import ITeachersRepository from '../repositories/ITeachersRepository';

interface IResponse {
  teacherUpdated: Teacher;
  scheduleUpdated: Schedule[];
}

interface IRequest {
  user_id: string;
  whatsapp: string;
  biography: string;
  subject_id: number;
  cost: string;
  schedules: Schedule[];
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,

    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute({
    user_id,
    whatsapp,
    biography,
    subject_id,
    cost,
    schedules,
  }: IRequest): Promise<IResponse> {
    const teacher = await this.teachersRepository.findById(user_id);

    if (!teacher) {
      throw new AppError('Teacher not found.');
    }

    teacher.whatsapp = whatsapp;
    teacher.biography = biography;
    teacher.subject_id = subject_id;
    teacher.cost = cost;

    const teacherUpdated = await this.teachersRepository.save(teacher);

    const { id } = teacher;

    schedules.forEach(i => {
      Object.assign(i, {
        teacher_id: id,
        from: convertHourToMinutes(String(i.from)),
        to: convertHourToMinutes(String(i.to)),
      });
    });

    const scheduleUpdated = await this.schedulesRepository.save(schedules);

    return { teacherUpdated, scheduleUpdated };
  }
}

export default UpdateProfileService;
