import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { VideosModule } from 'src/videos/videos.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SuggestedModule } from './suggested/suggested.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: configService.get('DB_SYNCHRONIZE'),
          entities: [__dirname + 'dist/**/entity/*{.ts,.js}'],
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    VideosModule,
    UserModule,
    AuthModule,
    SuggestedModule,
  ],
  controllers: [],
})
export class AppModule {
}
