import { Stats } from './../../stats/entity/stats';
import { CustomEntityHandler } from 'src/shared/util/CustomEntityHandler';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';


@Entity()
export class Video extends CustomEntityHandler {

  @Column({ unique: true })
  videoId: string;

  @OneToOne(type => Stats, { cascade: true })
  @JoinColumn()
  stats: Stats;

}
