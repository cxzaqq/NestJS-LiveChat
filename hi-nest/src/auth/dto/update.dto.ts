import { IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  @IsString()
  readonly pw: string;

  @IsOptional()
  @IsString()
  readonly email: string;
}
