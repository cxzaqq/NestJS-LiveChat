import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthDTO } from 'src/auth/dto/authDto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('/signup')
  async signUp(@Body() signUpDto: AuthDTO.SignUp) {
    return this.usersService.signUp(signUpDto);
  }
}
