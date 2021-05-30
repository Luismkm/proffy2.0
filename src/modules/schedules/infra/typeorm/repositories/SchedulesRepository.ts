import { getRepository, Repository } from 'typeorm';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import { ICreateScheduleDTO } from '@modules/schedules/dtos/ICreateScheduleDTO';

import Schedule from '../entities/Schedule';

export default class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async create(scheduleData: ICreateScheduleDTO): Promise<Schedule[]> {
    const schedule = this.ormRepository.create(scheduleData);

    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async findById(id: string): Promise<Schedule[] | undefined> {
    const schedule = this.ormRepository.find({
      where: {
        teacher_id: id,
      },
      relations: ['weekday'],
    });

    return schedule;
  }

  public async save(schedule: Schedule[]): Promise<Schedule[]> {
    return this.ormRepository.save(schedule);
  }
}
