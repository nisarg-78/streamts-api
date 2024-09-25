import { Controller, Get, Param, Query } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('all')
  async findAll(@Query("tags") tags: string) {
    return await this.videosService.getAllVideos(tags);
  }

  @Get('search')
  async search(@Query("s") query: string) {
    return await this.videosService.searchVideos(query);
  }

  @Get('info/:id')
  async findOne(@Param('id') id: string) {
    return await this.videosService.getVideo(id);
  }

  @Get('master/:id')
  async getMaster(@Param('id') id: string) {
    return await this.videosService.getMasterM3U8(id);
  }
}
