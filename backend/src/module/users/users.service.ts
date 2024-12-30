import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';

@Injectable()
export class UsersService {
  constructor(public prisma: PrismaService) {}

  async getAllUsers() {
    // const allUsers = await this.prisma.users.findMany({
    //   select: {
    //     fullName: true,
    //     email: true,
    //     phoneNumber: true,
    //     avatar: true,

    //   },
    // });

    return `users`;
  }
}
