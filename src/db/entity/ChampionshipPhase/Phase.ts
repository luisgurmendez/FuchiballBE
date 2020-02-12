import { Column } from "typeorm";

export enum PhaseType {
  cup = 'cup',
  pointbased = 'pointbased',
}

export class Phase {

  @Column()
  order: number;

  @Column({ default: false })
  isFinalPhase: boolean

  @Column({ default: false })
  hasEnded: boolean;

  @Column({ type: 'enum', enum: PhaseType })
  type: PhaseType

}