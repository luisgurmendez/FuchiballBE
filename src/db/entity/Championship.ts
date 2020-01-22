import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Championship {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  season: string;

  @Column()
  active: boolean;

  // Championship type will be implemented on-demand. Examples can be, Cup (group based), playoffs, etc
  @Column()
  type: string;

}
