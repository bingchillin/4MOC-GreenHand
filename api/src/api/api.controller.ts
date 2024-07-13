import {Controller, Get, Post, Body, Patch, Param, Delete, Inject, Injectable} from '@nestjs/common';
import {ApiService} from './api.service';
import {UserService} from '../user/user.service';
import {SensorService} from '../sensor/sensor.service';

@Controller('api')
export class ApiController {
    constructor(
        private readonly apiService: ApiService,
        private readonly userService: UserService,
        private readonly sensorService: SensorService
    ) {}

    @Get('/users')
    async findAllUsers() {
        return await this.userService.findAll();
    }

    @Get('/sensors')
    async findAllSensors() {
        return await this.sensorService.findAll();
    }
}
