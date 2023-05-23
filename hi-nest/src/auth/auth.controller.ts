import { Controller, Get, Post, Param, Patch, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateDto } from './dto/update.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  getLogin() {
    return `this is login page`;
  }

  @Get('/signup')
  getSingUp() {
    return `this is sign up page`;
  }

  @Get('/user/:id')
  getUser(@Param('id') id: string) {
    return `this is user page with id ${id}`;
  }

  @Post('/login')
  login(@Body() userInfo: LoginDto) {
    return this.authService.login(userInfo);
  }

  @Post()
  singUp(@Body() userInfo: SignUpDto) {
    return this.authService.signup(userInfo);
  }

  @Patch('/user/:id')
  patch(@Param('id') id: string, @Body() updateData: UpdateDto) {
    return this.authService.update(id, updateData);
  }
}
