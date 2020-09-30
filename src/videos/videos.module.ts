import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosController } from 'src/videos/videos.controller';
import { Video } from 'src/videos/entity/video';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideosController],
})
export class VideosModule {
}
