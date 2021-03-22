import { Controller } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
	model: {
		type: User,
	},
	params: {
		roleId: {
			field: 'roleId',
			type: 'number',
		},
		id: {
			field: 'id',
			type: 'uuid',
			primary: true
		}
	},
	query: {
		alwaysPaginate: false,
		softDelete: true,
		allow: ['email', 'cpf'],
		join: {
			permission: {
				exclude: ['description'],
			},
			roles: {
				//alias: 'roleUsers',
				eager: true,
			},
		},
	},
})

@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
	constructor(public service: UsersService) { }

	get base(): CrudController<User> {
		return this;
	}

	@Override('getManyBase')
	getAll(@ParsedRequest() req: CrudRequest) {
		return this.base.getManyBase(req);
	}

}