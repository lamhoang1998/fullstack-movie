import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './module/auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { RolesGuard } from './module/auth/roles.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'bearer-token',
    )
    .addTag('cats')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const reflector = app.get(Reflector);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalGuards(new RolesGuard(reflector));

  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
