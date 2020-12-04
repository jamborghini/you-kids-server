import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosModule } from 'src/videos/videos.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Controller } from './suggested-videos/.controller';
import { SuggestedModule } from './suggested/suggested.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    VideosModule,
    UserModule,
    AuthModule,
    SuggestedModule,
  ],
  controllers: [Controller],
})
export class AppModule {
}
