import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPerPage } from './dto/userPerPage.dto';
import { SearchUser, SearchUserPerPage } from './dto/searchUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(`get-all-users`)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(`get-users-per-page`)
  getUserPerPage(@Query() pageQuery: UserPerPage) {
    return this.usersService.getUserPerPage(pageQuery);
  }

  @Get(`search-users`)
  searchUser(@Query() userName: SearchUser) {
    return this.usersService.searchUser(userName);
  }

  @Get(`search-users-per-page`)
  searchUserPerPage(@Query() userPerPage: SearchUserPerPage) {
    return this.usersService.searchUserPerPage(userPerPage);
  }

  @Get(`get-all-roles`)
  getAllRoles() {
    return this.usersService.getAllRoles();
  }
}
