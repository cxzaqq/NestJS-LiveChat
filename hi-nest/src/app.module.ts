import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [UserEntity],
      synchronize: false,
      autoLoadEntities: true,
      logging: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
          },
        },
        defaults: {
          from: '"noreply" <gmail.com>',
        },
      }),
    }),
    AuthModule,
    UsersModule,
    CacheModule.register({
      ttl: 3000, //milliseconds
      max: 3,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
