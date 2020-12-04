import { StatsModule } from 'src/stats/stats.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/videos/entity/video';
import { VideosController } from 'src/videos/videos.controller';
import { SuggestedModule } from './suggested/suggested.module';


@Module({
  imports: [TypeOrmModule.forFeature([Video]), StatsModule, SuggestedModule],
  controllers: [VideosController],
})
export class VideosModule {
}
