import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, SaveOptions } from 'typeorm';
import { ConflictException } from '@nestjs/common';


export class CustomEntityHandler extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;


  save(options?: SaveOptions): Promise<this> {
    
    return super.save(options).catch(error => {

      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException();
      }

      throw error;
    });
  }
}
