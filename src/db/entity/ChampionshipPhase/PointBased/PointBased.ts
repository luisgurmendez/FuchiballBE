import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { PointBasedGroup } from "./PointBasedGroup";
import { Phase } from "../Phase";

@Entity()
export class PointBased extends Phase {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => PointBasedGroup, group => group.pointBased)
  groups: PointBasedGroup[]
}
