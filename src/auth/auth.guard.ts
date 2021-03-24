import {
    Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
//import { USER_REQUEST_KEY } from '../config/constants';
import { jwtConstants } from '../config/constants';
import { getFeature, getAction } from "@nestjsx/crud";

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        request.user = await this.validateToken(request.headers.authorization);
        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        try {
            const token = auth.split(' ')[1];
            //const decode = await jwt.verify(token, process.env.SECRET);USER_REQUEST_KEY
            const decode = await jwt.verify(token, jwtConstants.secret);
            console.log('decode', decode);
        } catch (error) {
            const message = 'Token Error: ' + (error.message || error.name);
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
}

// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// import { UsersService } from '../users/users.service';
// import { USER_REQUEST_KEY } from '../constants';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private usersService: UsersService) { }

//     async canActivate(ctx: ExecutionContext): Promise<boolean> {
//         const req = ctx.switchToHttp().getRequest();
//         req[USER_REQUEST_KEY] = await this.usersService.findOne(1);

//         return true;
//     }
// }