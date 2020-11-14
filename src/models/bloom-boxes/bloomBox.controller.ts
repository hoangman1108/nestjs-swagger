import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BloomBox } from './bloomBox.schema';
import { BloomBoxService } from './bloomBox.service';
import { CreateBloomBoxDto } from './dto/create-bloom-box.dto';

@ApiTags('BloomsBoxes')
@Controller('bloomBoxes')
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
