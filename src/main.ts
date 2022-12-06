import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwaggerDocs } from './helpers/configure-swagger-docs.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  configureSwaggerDocs(app);
  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    Logger.log(`Listening on port ${port}`);
  });
}
bootstrap();
