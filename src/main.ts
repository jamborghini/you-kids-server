import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';


async function bootstrap() {
  // const apiLimiter = rateLimit({
  //   windowMs: 10 * 1000, // 15 minutes
  //   max: 10
  // });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use("/user/:id", apiLimiter);
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
