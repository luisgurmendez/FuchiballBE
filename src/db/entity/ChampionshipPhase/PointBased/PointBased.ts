import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Group } from "./Group";
import { Phase } from "../Phase";

@Entity()
export class PointBased extends Phase {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Group, group => group.pointBased)
  groups: Group[]
}
