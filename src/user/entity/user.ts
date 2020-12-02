import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcrypt';
import { CustomEntityHandler } from 'src/shared/util/CustomEntityHandler';
import { Role } from 'src/user/enum/role';

@Entity()
export class User extends CustomEntityHandler {

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  toJSON() {
    const { password, ...result } = this;
    return result;
  }

  @BeforeInsert()
  private async hashPassword() {
    this.password = await hash(this.password, 14);
  }
}
