import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Team } from "./Team";

@Entity()
export class Player {

  @Column({ default: false })
  isTeamAdmin: boolean

  @Column({ nullable: true })
  number: number;

  @Column({ default: false })
  suspended: boolean; // Can't play next match

  @ManyToOne(type => Team, team => team.players, { primary: true })
  team: Team;

  @ManyToOne(type => User, user => user.players, { primary: true })
  user: User;
}
