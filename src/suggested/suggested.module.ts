import { forwardRef, Module } from '@nestjs/common';
import { SuggestedController } from './suggested.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggested } from 'src/suggested/entity/suggested';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entity/user';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Suggested])
  ],
  controllers: [SuggestedController],
})
export class SuggestedModule {
}
