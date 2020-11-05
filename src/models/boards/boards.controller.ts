import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from 'src/authentication/entities/auth.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@ApiTags('Board')
@Controller('boards')
@ApiSecurity('authorization')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) { }

  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board>{
    return await this.boardsService.createBoard(createBoardDto, user);
  }

  @Get()
  async getBoards(@GetUser() user: User): Promise<Board[]>{
    return await this.boardsService.getBoards(user);
  }
}
