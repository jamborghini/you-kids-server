import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosModule } from 'src/videos/videos.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    VideosModule],
})
export class AppModule {
}
