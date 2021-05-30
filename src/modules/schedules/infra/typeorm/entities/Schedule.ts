import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Weekday from './Weekday';
import Teacher from '../../../../teachers/infra/typeorm/entities/Teacher';

@Entity('schedules')
export default class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  teacher_id: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column()
  @Exclude()
  day_id: number;

  @ManyToOne(() => Weekday)
  @JoinColumn({ name: 'day_id' })
  weekday: Weekday;

  @Column()
  from: number;

  @Column()
  to: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
