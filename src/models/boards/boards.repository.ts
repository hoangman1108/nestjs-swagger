import { User } from "src/authentication/entities/auth.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Board } from "./entities/board.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title } = createBoardDto;
    const board = new Board();
    board.title = title;
    board.date = new Date();
    board.user = user;
    await board.save();
    delete board.user;
    return board;
  }

  async getBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
}