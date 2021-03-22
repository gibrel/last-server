import { NestFactory } from '@nestjs/core';
import { CrudConfigService } from '@nestjsx/crud';
import { USER_REQUEST_KEY } from './constants';

CrudConfigService.load({
  auth: {
    property: USER_REQUEST_KEY,
  },
  routes: {
  },
});

import { HttpExceptionFilter } from '../shared/https-exception.filter';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('@nestjsx/crud-typeorm')
    .setDescription('@nestjsx/crud-typeorm')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();