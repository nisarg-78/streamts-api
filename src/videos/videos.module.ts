import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './videos.schema';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [
    CredentialsModule,
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
})
export class VideosModule {}
