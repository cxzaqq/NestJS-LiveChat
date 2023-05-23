import { IsBoolean, IsString } from 'class-validator';

export class ResponseDto {
  @IsBoolean()
  readonly success: boolean;

  @IsString()
  readonly msg: string;
}
