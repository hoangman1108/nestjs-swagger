import { Test } from '@nestjs/testing';
import { User } from "../src/authentication/entities/auth.entity";
import { BoardsController } from "../src/models/boards/boards.controller"
import { BoardRepository } from "../src/models/boards/boards.repository";
import { BoardsService } from "../src/models/boards/boards.service";
import { Board } from "../src/models/boards/entities/board.entity";

describe('BoardsController', () => {
  let boardController: BoardsController;
  let boardService: BoardsService;
  let boardRepository: BoardRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [BoardsService],
    }).compile();
    boardRepository = new BoardRepository();
    boardService = new BoardsService(boardRepository);
    boardController = new BoardsController(boardService);
  });
  describe('findAll', () => {
    it('should return an array of boards', async () => {
      const result: Promise<Board[]> = Promise.resolve([]);
      const user = new User();
      user.id = 1;
      jest.spyOn(boardService, 'getBoards').mockImplementation(() => result);
      expect(await boardController.getBoards(user)).toBe(result);
    })
  })
})