import ICreateTeacherDTO from '../dtos/ICreateTeacherDTO';
import Teacher from '../infra/typeorm/entities/Teacher';

export default interface ITeachersRepository {
  create(data: ICreateTeacherDTO): Promise<Teacher>;
}
