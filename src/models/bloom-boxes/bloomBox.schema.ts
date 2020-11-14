import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BloomBoxDocument = BloomBox & Document;

@Schema()
export class BloomBox {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  number: number;
}
export const BloomBoxSchema = SchemaFactory.createForClass(BloomBox);