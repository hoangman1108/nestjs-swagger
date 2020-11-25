import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BloomBox, BloomBoxSchema } from './bloomBox.schema';
import { BloomBoxService } from './bloomBox.service';
import { BloomBoxController } from './bloomBox.controller';
import { AuthModule } from '../../authentication/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: BloomBox.name, schema: BloomBoxSchema }]),
    AuthModule,
],
  controllers: [BloomBoxController],
  providers: [BloomBoxService]
})
export class BloomBoxModule { }
