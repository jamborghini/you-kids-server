import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcrypt';
import { CustomEntityHandler } from 'src/shared/util/CustomEntityHandler';

@Entity()
export class User extends CustomEntityHandler {

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;


  @Column()
  password: string;

  toJSON() {
    const { password, ...result } = this;
    return result;
  }

  @BeforeInsert()
  private async hashPassword() {
    this.password = await hash(this.password, 14);
  }
}
