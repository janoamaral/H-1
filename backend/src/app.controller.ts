import { Controller, Get, Post, Header, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  re: Response;

  @Post()
  @Header('Content-Type', 'text/event-stream')
  getAiRequest(@Req() req: Request) {
    if (this.re) {
      let { data } = req.body;
      console.log(data);
      this.appService.getHello(this.re, data);
    }
  }

  @Get('/sse')
  @Header('Content-Type', 'text/event-stream')
  sendData(@Res() res: Response) {
    this.re = res;
  }
}
