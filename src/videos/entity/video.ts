import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { Channel } from 'src/channel/entity/channel';

@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  title: string

  @Column()
  video_id: string;

  @Column()
  thumbnail_url: string

  @Column()
  views: number;

  @Column()
  uploadedAt: Date;


  @ManyToOne(() => Channel, channel => channel.videos)
  @JoinColumn()
  channel: Channel;

}
