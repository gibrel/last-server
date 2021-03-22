import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, BeforeUpdate
} from "typeorm"
import {
    IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength
} from "class-validator";
import { Type } from "class-transformer";
import { CrudValidationGroups } from "@nestjsx/crud";

import { Permission } from '../permissions/permission.entity';
import { Role } from '../roles/role.entity';
import { BaseEntity } from "../base-entity";

const { CREATE, UPDATE } = CrudValidationGroups;

export class Name {
    @IsString({ always: true })
    @Column({ nullable: true })
    first: string;

    @IsString({ always: true })
    @Column({ nullable: true })
    last: string;
}

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    @IsEmail({ require_tld: false }, { always: true })
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column('varchar', { length: 11, unique: true })
    cpf: string;

    @Type((t) => Name)
    @Column((type) => Name)
    name: Name;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsBoolean({ always: true })
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column()
    password: string;

    @Column({ nullable: false })
    roleId?: number;

    /** Time
     * 
     */

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeUpdate() updateTimestamp() {
        this.updatedAt = new Date;
    }

    /** Relations 
     * 
    */

    @ManyToOne((type) => Role, (c) => c.users)
    role: Role;

    @ManyToMany((type) => Permission, (c) => c.users)
    userPermissions?: Permission[];

}