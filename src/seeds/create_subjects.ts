import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import Subjects from '../modules/subjects/infra/typeorm/entities/Subject';

export default class CreateSubjects implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Subjects)
      .values([
        {
          subject: 'Artes',
        },
        {
          subject: 'Biologia',
        },
        {
          subject: 'Ciências',
        },
        {
          subject: 'Ed. Física',
        },
        {
          subject: 'Física',
        },
        {
          subject: 'Geografia',
        },
        {
          subject: 'História',
        },
        {
          subject: 'Inglês',
        },
        {
          subject: 'Matemática',
        },
        {
          subject: 'Português',
        },
        {
          subject: 'Química',
        },
      ])
      .execute();
  }
}
