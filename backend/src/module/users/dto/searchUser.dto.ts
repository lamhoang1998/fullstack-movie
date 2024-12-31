import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUser {
  @IsNotEmpty({ message: 'userName cannot be an empty string.' })
  userName: string;
}

export class SearchUserPerPage extends SearchUser {
  page: string;
  pageSize: string;
}
