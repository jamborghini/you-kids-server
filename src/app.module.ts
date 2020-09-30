import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosModule } from 'src/videos/videos.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
  VideosModule, ChannelModule],
})
export class AppModule {
}
