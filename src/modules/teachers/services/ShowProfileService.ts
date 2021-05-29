import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ITeachersRepository from '../repositories/ITeachersRepository';

interface IResponse {
  teacher: Teacher;
  schedule: Schedule[];
}

interface IRequest {
  id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,

    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const teacher = await this.teachersRepository.findById(id);

    if (!teacher) {
      console.log('Teacher not found.');
    }

    const schedule = await this.schedulesRepository.findById(teacher.id);

    return { teacher: classToClass(teacher), schedule: classToClass(schedule) };
  }
}

export default ShowProfileService;
