import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SensorDocument = HydratedDocument<Sensor>;

@Schema()
export class Sensor {
    @Prop()
    name: string;

    @Prop({ default: 100})
    humidityLevel: number;

    @Prop({ default: 100})
    waterLevel: number;

    @Prop({ default: false })
    motorStatus: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    email: string;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);