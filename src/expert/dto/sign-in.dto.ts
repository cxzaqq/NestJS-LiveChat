import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  expertId: string;

  @IsString()
  @IsNotEmpty()
  userPw: string;
}
