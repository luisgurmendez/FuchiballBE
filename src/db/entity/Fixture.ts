import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Match } from "./Match";

@Entity()
export class Fixture {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Match, match => match.fixture)
  matches: Match[]
}
