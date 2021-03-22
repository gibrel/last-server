import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UserPermission } from './user-permissions.entity';

@Injectable()
export class UserPermissionsService extends TypeOrmCrudService<UserPermission> {
    constructor(@InjectRepository(UserPermission) repo) {
        super(repo);
    }
}