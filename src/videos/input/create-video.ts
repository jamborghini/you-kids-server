import { IsDate, IsNumber, IsObject, IsOptional, IsPositive, IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Reference } from 'src/shared/reference';
import { Channel } from 'src/channel/entity/channel';


export class CreateVideo {

  @Type(() => Reference)
  @ValidateNested()
  @IsObject()
  channel: Channel;

  @IsString()
  @Matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&()[\w\=]*)?/)
  link: string;

  @IsString()
  title: string;

  @IsString()
  video_id: string;

  @IsString()
  @Matches(/(ytimg.com.vi)/ig)
  thumbnail_url: string;

  @IsNumber()
  @IsPositive()
  views: number;

  @IsDate()
  @IsOptional()
  uploadedAt: Date;

}
