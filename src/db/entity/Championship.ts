import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Phase } from "./ChampionshipPhase/Phase";

@Entity()
export class Championship {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  season: string;

  @Column()
  active: boolean;

  @OneToMany(type => Phase, phase => phase.championship)
  phases: Phase[];

}
