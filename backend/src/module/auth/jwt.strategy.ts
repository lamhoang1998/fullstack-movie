import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { User, UserPayload } from 'src/common/types/users.types';
import 'passport';

declare module 'passport' {
  namespace Express {
    interface User {
      userId: number;
      email: string | null;
      fullName: string | null;
      phoneNumber: string | null;
      role_id: number | null;
      created_at: Date | null;
      updated_at: Date | null;
    }
  }
}

declare global {
  namespace Express {
    interface User {
      userId: number;
      email: string | null;
      fullName: string | null;
      phoneNumber: string | null;
      avatar: string | null;
      userType: string | null;
      created_at: Date | null;
      updated_at: Date | null;
    }
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'protect') {
  constructor(
    public configService: ConfigService,
    public prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: UserPayload) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: payload.userId,
      },
      omit: {
        password: true,
      },
    });
    return user as User;
  }
}
