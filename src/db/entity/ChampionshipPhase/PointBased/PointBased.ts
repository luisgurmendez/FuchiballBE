import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Group } from "./Group";

@Entity()
export class PointBased {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Group, group => group.pointBased)
  groups: Group[]
}
