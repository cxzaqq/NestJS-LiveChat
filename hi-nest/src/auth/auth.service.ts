import { Injectable } from '@nestjs/common';
import { ResponseDto } from './dto/response.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AuthService {
  login(userInfo: LoginDto): ResponseDto {
    return {
      success: true,
      msg: 'login',
    };
  }

  signup(userInfo: SignUpDto): ResponseDto {
    return {
      success: true,
      msg: 'signup',
    };
  }

  update(id: string, updateData: UpdateDto): ResponseDto {
    return {
      success: true,
      msg: 'update',
    };
  }
}
