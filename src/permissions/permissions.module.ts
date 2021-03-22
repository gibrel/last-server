import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';
import { UserPermission } from './user-permissions.entity';
import { UserPermissionsService } from './user-permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, UserPermission])],
  providers: [PermissionsService, UserPermissionsService],
  exports: [PermissionsService, UserPermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule { }
