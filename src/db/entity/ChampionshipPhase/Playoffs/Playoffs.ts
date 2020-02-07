import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { PlayoffGroup } from "./PlayoffGroup";
import { Phase } from "../Phase";

@Entity()
export class Playoffs extends Phase {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => PlayoffGroup, group => group.playoffs)
  groups: PlayoffGroup[]
}
