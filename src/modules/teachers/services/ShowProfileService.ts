import { injectable, inject } from 'tsyringe';

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
  teacher_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,

    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute({ teacher_id }: IRequest): Promise<IResponse> {
    const teacher = await this.teachersRepository.findById(teacher_id);

    if (!teacher) {
      console.log('Teacher not found.');
    }

    const schedule = await this.schedulesRepository.findById(teacher_id);

    return { teacher, schedule };
  }
}

export default ShowProfileService;
