import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Bloom } from './bloom.schema';
import { BloomService } from './bloom.service';
import { CreateBloomDto } from './dto/create-bloom.dto';

@ApiTags('Blooms')
@Controller('blooms')
@ApiSecurity('authorization')
@UseGuards(AuthGuard())
export class BloomController {
  constructor(private bloomsService: BloomService) { }

  @Post()
  async createBloom(@Body() createBloomDto: CreateBloomDto): Promise<Bloom>{
    return await this.bloomsService.create(createBloomDto);
  }

  @Get()
  async listBloom(): Promise<Bloom[]>{
    return await this.bloomsService.list();
  }
}
