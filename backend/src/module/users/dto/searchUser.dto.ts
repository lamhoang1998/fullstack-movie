import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUser {
  @ApiProperty()
  @IsNotEmpty({ message: 'userName cannot be an empty string.' })
  userName: string;
}

export class SearchUserPerPage extends SearchUser {
  @ApiProperty()
  @IsString()
  page: string;

  @ApiProperty()
  @IsString()
  pageSize: string;
}
