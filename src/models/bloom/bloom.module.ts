import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BloomController } from './bloom.controller';
import { Bloom, BloomSchema } from './bloom.schema';
import { BloomService } from './bloom.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bloom.name, schema: BloomSchema }])],
  controllers: [BloomController],
  providers: [BloomService]
})
export class BloomModule { }
