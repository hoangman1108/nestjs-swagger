import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { BloomService } from 'src/models/bloom/bloom.service';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly bloomService: BloomService) { }

  async use(req: Request, res: Response, next: Function) {
    const list = await this.bloomService.list();
    // console.log('list', list);
    console.log('Request...');
    next();
  }
}
export default LoggerMiddleware;
