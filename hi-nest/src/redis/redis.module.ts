import { Module } from '@nestjs/common';
import { RedisController } from './redis.controller';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      Store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 6000, //seconds (ms)
      max: 15, // maximum number of items in cache
      inGlobla: true,
    }),
  ],
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
