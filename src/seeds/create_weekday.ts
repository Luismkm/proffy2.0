import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import Weekday from '../modules/subjects/infra/typeorm/entities/Weekday';

export default class CreateWeekday implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Weekday)
      .values([
        {
          day: 'Segunda-feira',
        },
        {
          day: 'Terça-feira',
        },
        {
          day: 'Quarta-feira',
        },
        {
          day: 'Quinta-feira',
        },
        {
          day: 'Sexta-feira',
        },
        {
          day: 'Sábado',
        },
        {
          day: 'Domingo',
        },
      ])
      .execute();
  }
}
