import {Injectable} from '@nestjs/common';
import {CreateSensorDto} from './dto/create-sensor.dto';
import {UpdateSensorDto} from './dto/update-sensor.dto';
import {Sensor, SensorDocument} from "./schemas/sensor.schema";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class SensorService {
    constructor(@InjectModel(Sensor.name) private sensorDocumentModel: Model<SensorDocument>) {
    }

    async create(createSensorDto: CreateSensorDto) {
        try {
            const newSensor = new this.sensorDocumentModel({
                ...createSensorDto,
            });

            return newSensor.save();
        } catch (error) {
            throw new Error(`Failed to create sensor: ${error.message}`);
        }
    }

    async findAll(): Promise<Sensor[]> {
        return this.sensorDocumentModel.find().lean().exec();
    }

    async findOne(id: string) {
        const sensor = this.sensorDocumentModel.findById(id).lean().exec();
        if (!sensor) {
            throw new Error('Sensor not found');
        }
        return sensor;
    }

    async update(id: string, updateSensorDto: UpdateSensorDto) {
        const existingSensor = await this.sensorDocumentModel.findById(id).lean().exec();
        if (!existingSensor) {
            throw new Error('Sensor not found');
        }

        return this.sensorDocumentModel.findByIdAndUpdate(id, updateSensorDto).lean().exec();
    }

    async remove(id: string) {
        const existingSensor = await this.sensorDocumentModel.findById(id).lean().exec();
        if (!existingSensor) {
            throw new Error('Sensor not found');
        }

        return this.sensorDocumentModel.findByIdAndDelete(id).lean().exec();
    }
}
