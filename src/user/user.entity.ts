import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import UserRo from './user-ro';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  }

  toResponseObject(): UserRo {
    const { id, created, email } = this;
    const responseObject: UserRo = { id, created, email };
    return responseObject;
  }

  constructor(email?: string, password?: string, created?: Date) {
    this.email = email || '';
    this.password = password || '';
    this.created = created || new Date();
  }
}
