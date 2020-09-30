import { IsId } from 'src/decorator/is-id';

export class Reference {
  @IsId()
  id: number;
}
