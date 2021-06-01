import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeacherRepository';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ITeachersRepository>(
  'TeachersRepository',
  TeachersRepository,
);

container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepository,
);
