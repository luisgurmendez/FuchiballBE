import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { Team } from "../../Team";
import { Playoffs } from "./Playoffs";
import { Fixture } from "db/entity/Fixture";

@Entity()
export class PlayoffGroup {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  twoGamed: boolean;

  @ManyToMany(type => Team)
  @JoinTable()
  teams: Team[];

  @ManyToOne(type => Playoffs, playoffs => playoffs.groups)
  playoffs: Playoffs;

  @OneToOne(type => Fixture)
  fixture: Fixture;

}
