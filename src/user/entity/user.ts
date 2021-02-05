import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { CustomEntityHandler } from 'src/shared/util/CustomEntityHandler';
import { Role } from 'src/user/enum/role';
import { Suggested } from 'src/suggested/entity/suggested';

@Entity()
export class User extends CustomEntityHandler {

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({default: false})
  isEmailConfirmed: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToMany(() => Suggested, suggested => suggested.suggester)
  suggestions: Suggested[];

  toJSON() {
    const { password, ...result } = this;
    return result;
  }

  @BeforeInsert()
  private async hashPassword() {
    this.password = await hash(this.password, 14);
  }
}
