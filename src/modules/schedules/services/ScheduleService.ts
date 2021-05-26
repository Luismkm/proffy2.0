import { injectable, inject } from 'tsyringe';

import ISchedulesRepository from '../repositories/ISchedulesRepository';

import Schedule from '../infra/typeorm/entities/Schedule';

interface IRequest {
  teacher_id: string;
  schedule: {
    day: number;
    from: number;
    to: number;
  };
}

@injectable()
class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute({ teacher_id, schedule }: IRequest): Promise<Schedule> {
    /*   Object.assign(schedule, { teacher_id });
    const schedules = await this.schedulesRepository.create(schedule); */

    return null;
  }
}

export default CreateScheduleService;
