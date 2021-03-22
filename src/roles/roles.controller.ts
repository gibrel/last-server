import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

import { Role } from './role.entity';
import { RolesService } from './roles.service';

@Crud({
	model: {
		type: Role
	},
	params: {
		id: {
			field: 'id',
			type: 'number',
			primary: true
		}
	},
	query: {
		alwaysPaginate: false,
		softDelete: true,
		allow: ['name'],
		join: {
			users: {
				alias: 'roleUsers',
				eager: true,
			},
		},
	},
})

@ApiTags('roles')
@Controller('roles')
export class RolesController {
	constructor(public service: RolesService) { }
}