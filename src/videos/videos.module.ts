import { StatsModule } from 'src/stats/stats.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/videos/entity/video';
import { VideosController } from 'src/videos/videos.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Video]), StatsModule],
  controllers: [VideosController],
})
export class VideosModule {
}
