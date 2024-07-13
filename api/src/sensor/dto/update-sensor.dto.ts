import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDto } from './create-sensor.dto';

export class UpdateSensorDto extends PartialType(CreateSensorDto) {
    name: string;
    humidityLevel: number;
    waterLevel: number;
    motorStatus: boolean;
    createdAt: Date;
    email: string;
}
