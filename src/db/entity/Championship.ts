import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Phase } from "./ChampionshipPhase/Phase";

@Entity()
export class Championship {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  season: string;

  @Column()
  active: boolean;

  // @Column()
  // phases: Phase[];

}
