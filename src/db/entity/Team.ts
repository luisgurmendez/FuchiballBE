import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Division } from "./Division";
import { Player } from "./Player";

@Entity()
export class Team {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => Player, player => player.team)
  players: Player[]

  @OneToOne(type => Division)
  @JoinColumn()
  division: Division;
}
