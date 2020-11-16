import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BloomBox } from './bloomBox.schema';
import { BloomBoxService } from './bloomBox.service';
import { CreateBloomBoxDto } from './dto/create-bloom-box.dto';

@ApiTags('BloomsBoxes')
@Controller('bloomBoxes')
@ApiSecurity('authorization')
@UseGuards(AuthGuard())
export class BloomBoxController {
  constructor(private bloomBoxesService: BloomBoxService) { }

  @Post()
  async createBloomBox(@Body() createBloomBoxDto: CreateBloomBoxDto): Promise<BloomBox>{
    return await this.bloomBoxesService.create(createBloomBoxDto);
  }

  @Get()
  async listBloomBox(): Promise<BloomBox[]>{
    return await this.bloomBoxesService.list();
  }
}
