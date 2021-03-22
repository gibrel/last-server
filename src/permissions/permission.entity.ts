import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDefined, IsEmpty, IsNumber, IsOptional, IsString, MaxLength
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

import { User } from '../users/user.entity';
import { UserPermission } from './user-permissions.entity';
import { BaseEntity } from '../base-entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('permissions')
export class Permission extends BaseEntity {

  @IsOptional({ groups: [UPDATE] })
  @IsEmpty({ groups: [CREATE] })
  @IsNumber({}, { groups: [UPDATE] })
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @IsOptional({ always: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  /** Relations 
   * 
  */

  @ManyToMany((type) => User, (u) => u.userPermissions, { cascade: true })
  @JoinTable({
    name: 'user_permissions',
    joinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users?: User[];

  @OneToMany((type) => UserPermission, (el) => el.permission, {
    persistence: false,
    onDelete: 'CASCADE',
  })
  userPermissions!: UserPermission[];

}