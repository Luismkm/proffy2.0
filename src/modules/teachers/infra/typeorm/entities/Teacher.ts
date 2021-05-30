import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import Subjects from './Subject';

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
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}
