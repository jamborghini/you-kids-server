import { StatsService } from './../stats/stats.service';
import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Video } from 'src/videos/entity/video';
import { CreateVideo } from 'src/videos/input/create-video';

@Controller('videos')
export class VideosController {

  constructor(private statsService: StatsService) {

  }

  @Post()
  async createVideo(@Body() body: CreateVideo): Promise<Video> {
    const video = await Video.findOne({ videoId: body.videoId });

    if (null != video) {
      throw new ConflictException();
    }

    body.stats = await this.statsService.createStats(body.videoId);

    if (body.stats == null) {
      throw new NotFoundException()
    }

    return Video.create(body).save();
  }

  @Get(':videoId')
  async getVideo(@Param('videoId') videoId: string): Promise<Video> {
    const video = await Video.findOne({where: {videoId}, relations :['stats']});
    
    if (null == video) {
      throw new NotFoundException();
    }

    return video;
  }

  @Get()
  async getAllVideos(): Promise<Video[]> {
    return Video.find({ relations: ['stats'] });
  }

  @Delete()
  async deleteVideo(@Param('id') id: number): Promise<Video> {
    const video = await Video.findOne(id);

    if (null == video) {
      throw new NotFoundException();
    }

    await video.remove();

    return video;
  }

}
