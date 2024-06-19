import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Injectable } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { UserService } from '../user/user.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly userService: UserService
  ) { }
}
