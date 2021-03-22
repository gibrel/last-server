import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';


@Crud({
	model: {
		type: Permission
	},
	params: {
		permissiond: {
			field: 'permissionId',
			type: 'number',
		},
		id: {
			field: 'id',
			type: 'number',
			primary: true
		}
	},
	query: {
		join: {
			users: {},
		},
	},
})

@ApiTags('permissions')
@Controller('permission')
export class PermissionsController {
	constructor(public service: PermissionsService) { }
}