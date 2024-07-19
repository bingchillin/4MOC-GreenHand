import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    NotFoundException,
    Render,
    UseGuards
} from '@nestjs/common';
import {SensorService} from './sensor.service';
import {CreateSensorDto} from './dto/create-sensor.dto';
import {UpdateSensorDto} from './dto/update-sensor.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('sensor')
export class SensorController {
    constructor(private readonly sensorService: SensorService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createSensorDto: CreateSensorDto) {
        try {
            return await this.sensorService.create(createSensorDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @Render('sensors/sensors')
    async findAllView() {
        try {
            const sensors = await this.sensorService.findAll();
            return {sensors};
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.sensorService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
        try {
            return await this.sensorService.update(id, updateSensorDto);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.sensorService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
