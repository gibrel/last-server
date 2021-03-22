import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '../users/user.entity';
import { Permission } from './permission.entity';

@Entity('user_permissions')
export class UserPermission {
    @PrimaryColumn()
    public permissionId!: number;

    @PrimaryColumn()
    public userId!: number;

    /** Relations
     * 
     */

    @ManyToOne((type) => Permission, (el) => el.userPermissions, {
        primary: true,
        persistence: false,
        onDelete: 'CASCADE',
    })
    public permission: Permission;

    @ManyToOne((type) => User, (el) => el.userPermissions, {
        primary: true,
        persistence: false,
    })
    public user: User;
}