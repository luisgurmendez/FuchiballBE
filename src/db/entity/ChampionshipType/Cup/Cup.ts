import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Group } from "./Group";

enum CupState {
  group = 'group',
  knockout = 'knockout'
}

@Entity()
export class Cup {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Group, group => group.cup)
  groups: Group[]

  @Column({ type: 'enum', enum: CupState, default: CupState.group })
  state: CupState;
}
