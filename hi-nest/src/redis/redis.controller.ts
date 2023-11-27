import { Controller, Get, Body } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Public()
  @Get()
  async get() {
    await this.redisService.set('key', '{"id": 1, "title": "hi"}');
    const key = 'key';
    const value = await this.redisService.get(key);
    console.log(value);
    console.log(JSON.parse(value));
    return value;
  }
}
