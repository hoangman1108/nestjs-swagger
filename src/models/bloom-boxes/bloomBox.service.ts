import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Model } from 'mongoose';
import { BloomBox, BloomBoxDocument } from './bloomBox.schema';
import { CreateBloomBoxDto } from './dto/create-bloom-box.dto';

@Injectable()
export class BloomBoxService {
  constructor(
    @InjectModel(BloomBox.name)
    private bloomBoxCollection: Model<BloomBoxDocument>,
    @InjectConnection()
    private connection: Connection) { }

  async create(createBloomDto: CreateBloomBoxDto): Promise<BloomBox> {
    const createdCat = new this.bloomBoxCollection(createBloomDto);
    return createdCat.save();
  }

  async list(): Promise<BloomBox[]> {
    return this.bloomBoxCollection.find().exec();
  }

}
