import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Video } from 'src/videos/entity/video';

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()


  @OneToMany(() => Video, video => video.channel)
  videos: Video[];
}
