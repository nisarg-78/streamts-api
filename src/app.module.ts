import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsModule } from './credentials/credentials.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    VideosModule,
    CredentialsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL_PROD),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
