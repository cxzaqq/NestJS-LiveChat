import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';
import { ExpertModule } from './expert/expert.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, AuthModule, ExpertModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
