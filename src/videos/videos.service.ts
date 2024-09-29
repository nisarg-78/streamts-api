import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    @InjectModel('Video') private videoModel: Model<Video>,
  ) {}

  async getAllVideos(tags: string) {
    try {
      const tagsArr = tags?.split(',').filter((tag) => tag !== '');
      if (tagsArr.length > 0) {
        const videos = await this.videoModel.find({ tags: { $in: tagsArr } });
        if (!videos) throw new BadRequestException('Videos not found');
        return videos;
      } else {
        const videos = await this.videoModel.find();
        return videos;
      }
    } catch (error) {
      console.error('Error retrieving videos:', error);
    }
  }

  async searchVideos(query: string) {
    try {
      const videos = await this.videoModel.find({
        title: { $regex: query, $options: 'i' },
      });
      return videos;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error retrieving videos');
    }
  }

  async getVideo(id: string) {
    const video = await this.videoModel.findOne({ id });
    if (!video) throw new BadRequestException('Video not found');
    return video;
  }
}
