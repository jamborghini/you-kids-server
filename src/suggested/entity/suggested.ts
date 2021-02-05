import { CustomEntityHandler } from 'src/shared/util/CustomEntityHandler';
import { AfterLoad, BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entity/user';
import { UnprocessableEntityException } from '@nestjs/common';

@Entity()
export class Suggested extends CustomEntityHandler {

  @Column({ unique: true })
  link: string;

  @ManyToOne(() => User, suggester => suggester.suggestions)
  @JoinColumn()
  suggester: User;

  @BeforeInsert()
  private async preventInsertion() {
    const suggests = await Suggested.count();
    if (suggests > 4) {
      throw new UnprocessableEntityException('Maximum suggestions exceeded');
    }
  }

  @AfterLoad()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private async deleteInsertion() {
  }

}
