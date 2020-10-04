import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Stats extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  likeCount: number;

  @Column({ nullable: true })
  dislikeCount: number;

  @Column({ nullable: true })
  viewCount: number;

  @Column({ nullable: true })
  publishedAt: Date;

  toJSON() {
    const { id, ...clone } = this;
    return clone;
  }
}
