import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Teacher from '../infra/typeorm/entities/Teacher';
import ITeachersRepository from '../repositories/ITeachersRepository';

interface IRequest {
  teacher_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateTeacherAvatarService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    teacher_id,
    avatarFilename,
  }: IRequest): Promise<Teacher> {
    const teacher = await this.teachersRepository.findById(teacher_id);

    if (!teacher) {
      console.log('Only authenticated');
    }

    if (teacher.avatar) {
      await this.storageProvider.deleteFile(teacher.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    teacher.avatar = fileName;

    await this.teachersRepository.save(teacher);

    return teacher;
  }
}
