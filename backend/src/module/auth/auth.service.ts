import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/common/prisma/init.prisma';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { UserExists } from 'src/common/types/users.types';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    public prisma: PrismaService,
    public jwtService: JwtService,
    public configService: ConfigService,
  ) {}
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

  async login(loginBody: LoginDto) {
    const { email, password } = loginBody;
    console.log({ email, password });

    const userExists = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        userId: true,
        password: true,
      },
    });

    console.log({ userExists });

    if (!userExists)
      throw new BadRequestException('Email không tồn tại, vui lòng đăng ký');

    const passHash = userExists.password;
    const isPassword = bcrypt.compareSync(password, passHash);
    console.log({ isPassword });
    if (!isPassword) throw new BadRequestException(`Mật khẩu không chính xác`);

    const tokens = this.createTokens(userExists);

    return tokens;
  }
  async register(registerBody: RegisterDto): Promise<any> {
    const isExisted = await this.prisma.users.findFirst({
      where: {
        email: registerBody.email,
      },
      omit: { password: true },
    });

    console.log({ isExisted });

    if (isExisted)
      throw new BadRequestException(
        `email already existed, please enter a new one`,
      );

    const hashPassword = bcrypt.hashSync(registerBody.password, 10);
    console.log({ hashPassword });

    //role_id is optional, if no role_id sent, just basically use the default value set in database
    const newUser = await this.prisma.users.create({
      data: {
        email: registerBody.email,
        fullName: registerBody.fullName,
        password: hashPassword,
        phoneNumber: registerBody.phoneNumber,
        ...(registerBody.role_id && { role_id: registerBody.role_id }),
      },
      omit: {
        password: true,
      },
    });

    console.log({ newUser });

    return newUser;
  }

  async refreshToken(req: Request) {
    const refreshToken = req.headers?.authorization?.split(' ')[1];
    const accessToken = req.headers[`x-access-token`] as string;

    if (!refreshToken) throw new UnauthorizedException();
    if (!accessToken) throw new UnauthorizedException();

    const decodedAccessToken = this.jwtService.verify(accessToken, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: true,
    });

    const decodedRefreshToken = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });

    if (decodedRefreshToken.userId !== decodedAccessToken.userId)
      throw new UnauthorizedException();

    const user = await this.prisma.users.findUnique({
      where: {
        userId: decodedRefreshToken.userId,
      },
      select: { userId: true, password: true },
    });

    const tokens = this.createTokens(user);

    return tokens;
  }

  createTokens(userExists: UserExists) {
    const accessToken = this.jwtService.sign(
      { userId: userExists.userId },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRED'),
      },
    );
    const refreshToken = this.jwtService.sign(
      { userId: userExists.userId },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRED'),
      },
    );
    return { accessToken, refreshToken };
  }
}
