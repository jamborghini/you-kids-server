import { IsString } from 'class-validator';

export class CreateChannel {
  @IsString()
  name: string;
}
