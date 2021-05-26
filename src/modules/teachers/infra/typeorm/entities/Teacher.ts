import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Subjects from '../../../../subjects/infra/typeorm/entities/Subject';

@Entity('teachers')
export default class Teachers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  avatar: string;

  @Column()
  whatsapp: string;

  @Column()
  biography: string;

  @Column()
  subject_id: number;

  @ManyToOne(() => Subjects)
  @JoinColumn({ name: 'subject_id' })
  subject: Subjects;

  @Column()
  cost: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
