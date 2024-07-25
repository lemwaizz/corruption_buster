import { IsNotEmpty, IsString } from 'class-validator';

export class HandleMessageDto {
  @IsString()
  @IsNotEmpty()
  threadId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
