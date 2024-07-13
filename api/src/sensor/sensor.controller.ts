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
    Render
} from '@nestjs/common';
import {SensorService} from './sensor.service';
import {CreateSensorDto} from './dto/create-sensor.dto';
import {UpdateSensorDto} from './dto/update-sensor.dto';

@Controller('sensor')
export class SensorController {
    constructor(private readonly sensorService: SensorService) {
    }

    @Post()
    async create(@Body() createSensorDto: CreateSensorDto) {
        try {
            return await this.sensorService.create(createSensorDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

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

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.sensorService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
        try {
            return await this.sensorService.update(id, updateSensorDto);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.sensorService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
