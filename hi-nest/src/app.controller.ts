import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Post()
  async test(@Body() email: string) {
    return await this.appService.test(email);
  }
}
