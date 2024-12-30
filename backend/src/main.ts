import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './module/auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';
import { AllExceptionFilter } from './common/filter/all-exception.filter';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
