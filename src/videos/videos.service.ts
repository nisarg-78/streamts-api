import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsService } from 'src/credentials/credentials.service';
import { Video } from './video.interface';

@Injectable()
export class VideosService {
  constructor(
    private configService: ConfigService,
    private credentialsService: CredentialsService,
    @InjectModel('Video') private videoModel: Model<Video>
  ) {}

  async getAllVideos() {
    try {
      const videos = await this.videoModel.find()
      return videos
    } catch (error) {
      console.error("Error retrieving videos:", error)
    }
  }

  async getMasterM3U8(id: string) {
    try {
      const cdn = this.configService.get('CDN');
      const cookies = this.credentialsService.generateCFCookies();
      const masterM3U8 = await fetch(`${cdn}/videos/${id}/master.m3u8`, {
        headers: {
          Cookie: cookies
            .map((cookie) => `${cookie[0]}=${cookie[1]}`)
            .join('; '),
        },
      });
      let masterM3U8Text = await masterM3U8.text();
      masterM3U8Text = masterM3U8Text.replace(/https:\\\\cdn\.streamts\.tech/g, "<<<url>>>"); // how to patch 101
      masterM3U8Text = masterM3U8Text.replace(/<<<url>>>/g, cdn);
      return masterM3U8Text;
    } catch (e) {
      console.log(e);
    }
  }
}
