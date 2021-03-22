import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) repo) {
        super(repo);
    }

    async getByEmail(email: string) {
        const user = await this.repo.findOne({ email });
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async getByCpf(cpf: string) {
        const user = await this.repo.findOne({ cpf });
        if (user) {
            return user;
        }
        throw new HttpException('User with this cpf does not exist', HttpStatus.NOT_FOUND);
    }
}
