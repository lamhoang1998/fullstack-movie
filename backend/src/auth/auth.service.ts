import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/common/prisma/init.prisma';

@Injectable()
export class AuthService {
  constructor(public prisma: PrismaService) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  login(loginBody: LoginDto) {
    console.log({ loginBody });
    return `login`;
  }
  async register(registerBody: RegisterDto): Promise<any> {
    return `register`;
  }
}
