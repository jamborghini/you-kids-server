import { CustomEntityHandler } from 'src/shared/util/CustomEntityHandler';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entity/user';

export class Suggested extends CustomEntityHandler{

  @Column()
  link: string

  @ManyToOne(() => User, suggester => suggester.suggestions)
  @JoinColumn()
  suggester: User;


}
