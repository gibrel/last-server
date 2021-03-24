import { Injectable, HttpStatus } from '@nestjs/common';
//import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
//import { UserDTO } from '../users/user.dto';
// import { CrudRequest } from '@nestjsx/crud';
// import { ConnectionOptions, createConnection } from 'typeorm';
// import { USER_REQUEST_KEY, USER_REQUEST_KEY_EXPIRE } from '../config/constants';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { configService } from '../config/config.service';
import { ConnectionOptions, createConnection } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(userData: User, pass: string): Promise<any> {

        const user = (userData.cpf) ? await this.usersService.getByEmail(userData.email) :
            (userData.email) ? await this.usersService.getByCpf(userData.cpf) :
                await this.usersService.findOne(userData.id);

        if (user && user.password === crypto.createHmac('sha256', pass).digest('hex')) {
            const { password, ...result } = user;
            return result;
        }

        return null;

    }

    async getUserByEmailOrCpf(userData: string): Promise<any> {
        const user = await this.usersService.getByEmail(userData);
        return (user) ? user : await this.usersService.getByCpf(userData);
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async register(newUser: User): Promise<any> {
        if (!await this.getUserByEmailOrCpf(newUser.email) ||
            !await this.getUserByEmailOrCpf(newUser.cpf)) {
            //return this.usersService.createOne(newUser);
            const options = { ...configService.getTypeOrmConfig() };
            const connection = await createConnection(options as ConnectionOptions);
            const usersRepo = connection.getRepository(User);
            return await usersRepo.save(newUser);
        }
        return null;
    }

}
