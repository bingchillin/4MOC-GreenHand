import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (user && isPasswordMatching) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { _id: user._id, name: user.name, email: user.email };
        return {
            _id: user._id,
            email: user.email,
            access_token: this.jwtService.sign(payload),
        };
    }
}