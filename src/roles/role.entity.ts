import { CrudValidationGroups } from '@nestjsx/crud';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { User } from '../users/user.entity';
import { BaseEntity } from '../base-entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('roles')
export class Role extends BaseEntity {

  @IsOptional({ groups: [UPDATE] })
  @IsEmpty({ groups: [CREATE] })
  @IsNumber({}, { groups: [UPDATE] })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsOptional({ always: true })
  @IsString({ always: true })
  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  /** Relations
   * 
   */

  @OneToMany((type) => User, (u) => u.role)
  @Type((t) => User)
  users: User[];

}