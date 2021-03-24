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

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // private async validate(userData: User): Promise<UserDTO> {
    //     if (userData.email)
    //         return await this.usersService.getByEmail(userData.email);
    //     else
    //         return await this.usersService.getByCpf(userData.cpf);
    // }

    // public async login(user: User): Promise<any | { status: number }> {
    //     return this.validate(user).then(userData => {
    //         if (!userData) {
    //             return {
    //                 status: HttpStatus.BAD_REQUEST,
    //                 message: 'Invalid email/password',
    //             };
    //         }
    //         const payload = { id: userData.id, cpf: userData.cpf, email: userData.email };
    //         //const accessToken = jwt.sign(payload, process.env.SECRET, {
    //         // expiresIn: process.env.EXPIRE,
    //         const accessToken = jwt.sign(payload, USER_REQUEST_KEY, {
    //             expiresIn: USER_REQUEST_KEY_EXPIRE,
    //         });

    //         return {
    //             statusCode: HttpStatus.OK,
    //             access_token: accessToken,
    //             //expires_in: process.env.EXPIRE,
    //             expires_in: USER_REQUEST_KEY_EXPIRE,
    //             data: payload,
    //         };
    //     });
    // }

    // public async register(user: User): Promise<any> {
    //     return this.usersService.create(user);
    // }

    // public static async authenticateUser(
    //     user: { username: string, password: string }): Promise<User> {
    //     let u: User;
    //     u = await User.findOne({
    //         select: ['id', 'cpf', 'password_hash'],
    //         where: { username: user.username }
    //     });
    //     const passHash = crypto.createHmac('sha256', user.password).digest('hex');
    //     if (u.password_hash === passHash) {
    //         delete u.password_hash;
    //         return u;
    //     }
    // }
}
