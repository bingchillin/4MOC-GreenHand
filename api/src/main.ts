import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the views directory
  app.setBaseViewsDir(path.join(__dirname, '..', '/src/views'));

  // Set Handlebars as the rendering engine
  app.setViewEngine('hbs');
  hbs.registerPartials(path.join(__dirname, '..', '/src/views/partials'));

  app.useStaticAssets(path.join(__dirname, '..', '/src/public'));

  await app.listen(3000);
}
bootstrap();
