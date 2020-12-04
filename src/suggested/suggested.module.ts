import { Module } from '@nestjs/common';
import { SuggestedController } from './suggested.controller';

@Module({
  controllers: [SuggestedController]
})
export class SuggestedModule {}
