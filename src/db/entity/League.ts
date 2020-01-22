import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Division } from "./Division";

@Entity()
export class League {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  plan?: string;

  @Column()
  contact: string;

  @OneToMany(type => Division, division => division.league)
  divisions: Division[];

}
