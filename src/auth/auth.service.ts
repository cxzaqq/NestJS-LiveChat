import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userId: string,
    userPw: string,
  ): Promise<{ access_token: string; statusCode: number }> {
    const user = await this.userService.findOne(userId);
    if (user === null) {
      throw new UnauthorizedException('user not found');
    } else {
      if (user.userPw !== userPw) {
        throw new UnauthorizedException('Invalid password');
      }
    }

    const payload = {
      id: user.id,
      userId: user.userId,
      userNickname: user.userNickname,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      statusCode: HttpStatus.OK,
    };
  }
}
