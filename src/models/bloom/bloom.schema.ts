import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BloomBox, BloomBoxSchema } from '../bloom-boxes/bloomBox.schema';

export type BloomDocument = Bloom & Document;

@Schema()
export class Bloom {
  @Prop()
  color: string;

  @Prop()
  size: string;

  @Prop()
  price: number;

  @Prop()
  box: { type: Types.ObjectId, ref: BloomBox }
}

export const BloomSchema = SchemaFactory.createForClass(Bloom);