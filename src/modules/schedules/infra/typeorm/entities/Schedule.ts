import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Weekday from '../../../../subjects/infra/typeorm/entities/Weekday';
import Teacher from '../../../../teachers/infra/typeorm/entities/Teacher';

@Entity('schedules')
export default class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacher_id: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column()
  day_id: number;

  @ManyToOne(() => Weekday)
  @JoinColumn({ name: 'day_id' })
  weekday: Weekday;

  @Column()
  from: number;

  @Column()
  to: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
