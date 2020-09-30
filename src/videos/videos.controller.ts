import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Video } from 'src/videos/entity/video';
import { CreateVideo } from 'src/videos/input/create-video';

@Controller('videos')
export class VideosController {

  @Post()
  async createVideo(@Body() body: CreateVideo): Promise<Video> {
    return Video.create(body).save();
  }

  @Get(':')
  async getVideo(@Param('id') id: number): Promise<Video> {
    const video = await Video.findOne(id, { relations: ['channel'] });

    if (null == video) {
      throw new NotFoundException();
    }

    return video;
  }

  @Delete()
  async deleteVideo(@Param('id') id: number): Promise<Video> {
    const video = await Video.findOne(id);

    if(null == video){
      throw new NotFoundException()
    }

    await video.remove();

    return video;
  }

}
