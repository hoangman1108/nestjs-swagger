import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../authentication/entities/auth.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ){}

  async createBoard(
    createBoardDto: CreateBoardDto,
    user:User
    ):Promise<Board>{
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoards(user:User):Promise<Board[]>{
    return await this.boardRepository.getBoards(user);
  }
}
