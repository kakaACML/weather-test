import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

  // 启用CORS
  app.enableCors();

  // 全局校验管道
  app.useGlobalPipes(new ValidationPipe());

  // 全局http异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
