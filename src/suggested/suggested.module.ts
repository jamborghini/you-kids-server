import { Module } from '@nestjs/common';
import { SuggestedController } from './suggested.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggested } from 'src/suggested/entity/suggested';

@Module({
  imports: [TypeOrmModule.forFeature([Suggested])],
  controllers: [SuggestedController],
})
export class SuggestedModule {
}
