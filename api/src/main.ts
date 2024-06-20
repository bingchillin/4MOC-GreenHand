import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the views directory
  app.setBaseViewsDir(join(__dirname, '..', '/src/views'));
  app.useStaticAssets(join(__dirname, '..', '/src/public'));

  // Set Handlebars as the rendering engine
  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', '/src/views/partials'),
      layoutsDir: join(__dirname, '..', '/src/views/layouts'),
      defaultLayout: false,
      helpers: {
        formatDate: (date: Date) => {
          const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          return new Date(date).toLocaleDateString('fr-FR', options);
        }
      },
    }),
  );

  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
