import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AuthService],
})
export class AppModule {}
