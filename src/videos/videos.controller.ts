import { Controller, Get, Param } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('all')
  async findAll() {
    return await this.videosService.getAllVideos();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.videosService.getMasterM3U8(id);
  }
}
