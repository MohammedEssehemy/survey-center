import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-version',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: 422,
      forbidUnknownValues: true,
      transformOptions: {
        exposeDefaultValues: true,
        enableImplicitConversion: true,
      },
    }),
  );

  return app;
}

export const appInstancePromise = bootstrap();
