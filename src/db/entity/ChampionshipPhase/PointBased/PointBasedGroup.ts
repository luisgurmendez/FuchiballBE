import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { Team } from "../../Team";
import { PointBased } from "./PointBased";
import { Fixture } from "../../Fixture";

@Entity()
export class PointBasedGroup {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  twoGamed: boolean;

  @ManyToMany(type => Team)
  @JoinTable()
  teams: Team[];

  @ManyToOne(type => PointBased, pointbased => pointbased.groups)
  pointBased: PointBased;

  @OneToOne(type => Fixture)
  fixture: Fixture;

}
