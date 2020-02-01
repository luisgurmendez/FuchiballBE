import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Championship {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  season: string;

  @Column()
  active: boolean;

  @Column()
  type: string;

}
