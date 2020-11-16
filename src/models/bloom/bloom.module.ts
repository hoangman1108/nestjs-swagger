import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/authentication/auth.module';
import { BloomController } from './bloom.controller';
import { Bloom, BloomSchema } from './bloom.schema';
import { BloomService } from './bloom.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bloom.name, schema: BloomSchema }]),
    AuthModule,
  ],
  controllers: [BloomController],
  providers: [BloomService]
})
export class BloomModule { }
