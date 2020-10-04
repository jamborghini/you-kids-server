import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { retry } from 'rxjs/operators';
import { Stats } from './../../stats/entity/stats';


export class CreateVideo {

  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w-]{11}$/,{message: 'Given link does not satisfy required pattern'})
  @Transform(value => {
    if ('string' === typeof value) {
      const match = value.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/);
      
      if (match) {
        return match[1];
      }
    }
    return null;
  })
  videoId: string;

  stats: Stats;

}
