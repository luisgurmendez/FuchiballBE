import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { MatchEvent } from "./MatchEvent";
import { Team } from "./Team";
import { Referee } from "./Referee";
import { Fixture } from "./Fixture";

@Entity()
export class Match {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  starts: string;

  @Column()
  played: boolean;

  @OneToOne(type => Team)
  @JoinColumn()
  local: Team;

  @OneToOne(type => Team)
  @JoinColumn()
  visitant: Team;

  @OneToOne(type => Referee)
  @JoinColumn()
  referee: Referee;

  @OneToMany(type => MatchEvent, event => event.match)
  events: MatchEvent[];

  @ManyToOne(type => Fixture, fixture => fixture.matches)
  fixture: Fixture;
}
