import { Controller, Get, Header, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Header('Transfer-Encoding', 'chunked')
  @Header('X-Content-Type-Options', 'nosniff')
  async getHello(@Res() res: Response) {
    await this.appService.getHello(res);
  }

  @Get('/sse')
  @Header('Content-Type', 'text/event-stream')
  async sendData(@Res() res: any) {
    res.write('data: This is a message\n\n');
  }
}
