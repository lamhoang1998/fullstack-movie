import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(`get-all-users`)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
