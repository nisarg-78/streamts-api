import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
			"http://localhost:5173",
			"https://streamts.enth.dev",
			"https://hlsstream.netlify.app",
			"https://hlsstreamtest.netlify.app",
    ],
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
