import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Public()
  @ResponseMessage(`successfully signed in`)
  @Post(`login`)
  login(@Body() loginBody: LoginDto) {
    return this.authService.login(loginBody);
  }

  @Public()
  @ResponseMessage(`successfully signed up`)
  @Post(`register`)
  async register(@Body() registerBody: RegisterDto) {
    return this.authService.register(registerBody);
  }

  @Public()
  @ResponseMessage(`successfully refreshed tokens`)
  @Post(`refresh-token`)
  async refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }
}
