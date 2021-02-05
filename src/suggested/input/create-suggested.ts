import { IsString, Matches } from 'class-validator';
import { User } from 'src/user/entity/user';

const linkMatch = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/;

export class CreateSuggested {
  suggester: User;

  @IsString()
  @Matches(linkMatch, {
    message: 'Given link does not satisfy required pattern',
  })
  link: string;
}
