import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [CredentialsModule],
})
export class VideosModule {}
