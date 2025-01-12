import { IsString } from 'class-validator';

export class DeleteUser {
  @IsString()
  userId: string;
}
