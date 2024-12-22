import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.APP_LISTEN_PORT || 3000;
  const address = process.env.APP_LISTEN_ADDRESS || '0.0.0.0';

  await app.listen(port, address);
}
bootstrap();
