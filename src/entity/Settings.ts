import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  key: string;
  @Column('varchar')
  value: string;
}
