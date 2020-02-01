import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Team } from "../../Team";
import { PointBased } from "./PointBased";

@Entity()
export class Group {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Team)
  @JoinTable()
  teams: Team[];

  @ManyToOne(type => PointBased, pointbased => pointbased.groups)
  pointBased: PointBased;
}
