import { ICreateScheduleDTO } from '../dtos/ICreateScheduleDTO';
import Schedule from '../infra/typeorm/entities/Schedule';

export default interface ISchedulesRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule[]>;
  findById(id: string): Promise<Schedule[] | undefined>;
  save(schedule: ICreateScheduleDTO): Promise<Schedule[]>;
}
