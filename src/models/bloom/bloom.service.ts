import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Model, Types } from 'mongoose';
import { Bloom, BloomDocument } from './bloom.schema';
import { CreateBloomDto } from './dto/create-bloom.dto';

@Injectable()
export class BloomService {
  constructor(
    @InjectModel(Bloom.name)
    private bloomCollection: Model<BloomDocument>,
    @InjectConnection()
    private connection: Connection) { }

  async create(createBloomDto: CreateBloomDto): Promise<Bloom> {
    const createdCat = new this.bloomCollection({
      ...createBloomDto,
      box: (createBloomDto.box)
    });
    return createdCat.save();
  }

  async list(): Promise<Bloom[]> {
    return this.bloomCollection.find().exec();
  }

}
