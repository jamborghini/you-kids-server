import { StatsModule } from './../stats/stats.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/videos/entity/video';
import { VideosController } from 'src/videos/videos.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Video]), StatsModule],
  controllers: [VideosController],
  providers: []
})
export class VideosModule {
}
