import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { UserPerPage } from './dto/userPerPage.dto';
import { SearchUser, SearchUserPerPage } from './dto/searchUser.dto';
import { UpdateUserDto } from './dto/updateUserBody.dto';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { getPage, getPageSize, getTotalPage } from 'src/utils/page.utils';
import { DeleteUser } from './dto/deleteUser.dto';

@Injectable()
export class UsersService {
  constructor(public prisma: PrismaService) {}

  async getAllUsers() {
    const allUsers = await this.prisma.users.findMany({
      select: {
        fullName: true,
        email: true,
        phoneNumber: true,
        avatar: true,
        roles: { select: { name: true, description: true } },
      },
    });

    return allUsers;
  }

  async getUserPerPage(pageQuery: UserPerPage) {
    const page = getPage(pageQuery.page);

    const pageSize = getPageSize(pageQuery.pageSize);

    const totalItem = await this.prisma.users.count();

    const totalPage = getTotalPage(totalItem, pageSize);

    const userPerPage = await this.prisma.users.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        created_at: `desc`,
      },
      omit: { password: true },
    });

    return {
      pageSize,
      page,
      totalItem,
      totalPage,
      items: userPerPage || [],
    };
  }

  async searchUser(userName: SearchUser) {
    const searchedUser = this.prisma.users.findMany({
      where: {
        fullName: {
          startsWith: userName.userName,
        },
      },
    });
    return searchedUser;
  }

  async searchUserPerPage(userPerPage: SearchUserPerPage) {
    const page = getPage(userPerPage.page);
    const pageSize = getPageSize(userPerPage.pageSize);

    const totalItem = await this.prisma.users.count({
      where: {
        fullName: {
          startsWith: userPerPage.userName,
        },
      },
    });

    const totalPage = getTotalPage(totalItem, pageSize);

    const userSearchedPerPage = await this.prisma.users.findMany({
      where: {
        fullName: {
          startsWith: userPerPage.userName,
        },
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        created_at: `desc`,
      },
      omit: { password: true },
    });

    return {
      pageSize,
      page,
      totalItem,
      totalPage,
      items: userSearchedPerPage || [],
    };
  }

  async getAllRoles() {
    const allRoles = await this.prisma.roles.findMany({
      select: {
        name: true,
        description: true,
      },
    });

    return allRoles;
  }

  async getUserInfo(req: Request) {
    const userInfo = this.prisma.users.findUnique({
      where: {
        userId: req.user.userId,
      },
      omit: {
        password: true,
      },
    });

    return userInfo;
  }

  async updateUsers(updateUserBody: UpdateUserDto, req: Request) {
    const fullName = updateUserBody.fullName
      ? updateUserBody.fullName
      : req.user.fullName;

    const email = updateUserBody.email ? updateUserBody.email : req.user.email;

    const phoneNumber = updateUserBody.phoneNumber
      ? updateUserBody.phoneNumber
      : req.user.phoneNumber;

    if (updateUserBody.password) {
      const hashPassword = bcrypt.hashSync(updateUserBody.password, 10);

      const updatedUser = this.prisma.users.update({
        where: { userId: req.user.userId },
        data: {
          email: email,
          fullName: fullName,
          phoneNumber: phoneNumber,
          password: hashPassword,
        },
        omit: { password: true },
      });

      return updatedUser;
    } else {
      const updatedUser = this.prisma.users.update({
        where: { userId: req.user.userId },
        data: {
          email: email,
          fullName: fullName,
          phoneNumber: phoneNumber,
        },
        omit: { password: true },
      });

      return updatedUser;
    }
  }

  async deleteUsers(userId: DeleteUser) {
    const deleteUser = await this.prisma.users.delete({
      where: { userId: +userId.userId },
    });
    return deleteUser;
  }
}
