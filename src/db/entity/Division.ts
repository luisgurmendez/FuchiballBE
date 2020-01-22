import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { League } from "./League";

@Entity()
export class Division {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => League, league => league.divisions)
  league: League;

}
