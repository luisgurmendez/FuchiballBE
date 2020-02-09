import { Column } from "typeorm";

export class Phase {

  @Column()
  order: number;

  @Column({ default: false })
  isFinalPhase: boolean

}