import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Cup } from "./Cup";
import { Team } from "../../Team";

@Entity()
export class Group {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // TODO: Add a relationship with teams ManyToMany??
  @ManyToMany(type => Team)
  @JoinTable()
  teams: Team[];

  @ManyToOne(type => Cup, cup => cup.groups)
  cup: Cup;
}
