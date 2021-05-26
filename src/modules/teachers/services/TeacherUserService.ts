import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import convertHourToMinutes from '@shared/utils/convertHourToMinutes';
import ITeachersRepository from '../repositories/ITeachersRepository';

import Teacher from '../infra/typeorm/entities/Teacher';

interface ISchedulesData {
  teacher_id?: string;
  day_id: number;
  from: number;
  to: number;
}

interface IRequest {
  user_id: string;
  whatsapp: string;
  biography: string;
  cost: string;
  subject_id: string;
  schedules: ISchedulesData[];
}

@injectable()
class CreateTeacherService {
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
    cost,
    subject_id,
    schedules,
  }: IRequest): Promise<any> {
    const teacher = await this.teachersRepository.create({
      user_id,
      whatsapp,
      biography,
      subject_id: Number(subject_id),
      cost,
    });

    const { id } = teacher;

    schedules.forEach(i => {
      Object.assign(i, {
        teacher_id: id,
        from: convertHourToMinutes(String(i.from)),
        to: convertHourToMinutes(String(i.to)),
      });
    });

    const schedule = await this.schedulesRepository.create(schedules);

    return { teacher, schedule };
  }
}

export default CreateTeacherService;
