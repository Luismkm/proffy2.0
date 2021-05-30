import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import convertHourToMinutes from '@shared/utils/convertHourToMinutes';
import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';
import ITeachersRepository from '../repositories/ITeachersRepository';

import Teacher from '../infra/typeorm/entities/Teacher';

interface IResponse {
  teacher: Teacher;
  schedule: Schedule[];
}

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
  }: IRequest): Promise<IResponse> {
    const checkTeacherExists = await this.teachersRepository.findById(user_id);

    if (checkTeacherExists) {
      throw new AppError('You are already registered as a teacher');
    }

    const teacher = await this.teachersRepository.create({
      user_id,
      whatsapp,
      biography,
      subject_id: Number(subject_id),
      cost,
    });

    if (!teacher) {
      throw new AppError('An error occurred when registering.', 500);
    }

    const { id } = teacher;

    schedules.forEach(i => {
      Object.assign(i, {
        teacher_id: id,
        from: convertHourToMinutes(String(i.from)),
        to: convertHourToMinutes(String(i.to)),
      });
    });

    const schedule = await this.schedulesRepository.create(schedules);

    if (!teacher) {
      throw new AppError('An error occurred while registering schedule.', 500);
    }

    return { teacher, schedule };
  }
}

export default CreateTeacherService;
