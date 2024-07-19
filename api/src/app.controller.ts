import {Controller, Get, Render, Request, Post, UseGuards, Res, HttpException, HttpStatus} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from './auth/auth.service';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private authService: AuthService) {
    }

    @Get()
    @Render('index')
    loginPage() {
        return {layout: 'login'};
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Res() res) {
        const jwt = await this.authService.login(req.user);
        if (req.user.role !== 'admin') {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        res.cookie('user_token', jwt.access_token, {httpOnly: true});
        return res.redirect('/user');
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
