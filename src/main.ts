import 'reflect-metadata';
import { writeFile } from 'fs/promises';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appInstancePromise } from './bootstrap';
import { INestApplication } from '@nestjs/common';

async function main() {
  const app = await appInstancePromise;

  if (process.env.NODE_ENV !== 'production') {
    await setupSwagger(app);
  }
  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Survey Center')
    .setDescription('The survey center API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  return writeFile(
    './swagger.json',
    JSON.stringify(document, null, 2),
    'utf-8',
  );
}

main();
