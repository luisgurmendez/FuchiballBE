import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { MatchEvent, Event } from "./MatchEvent";
import { Team } from "./Team";
import { Referee } from "./Referee";
import { Fixture } from "./Fixture";

export interface MatchResults {
  localGoals: number;
  visitantGoals: number;
};

@Entity()
export class Match {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  startsAt: Date;

  @Column()
  played: boolean;

  @Column({ nullable: true })
  localGoals: number

  @Column({ nullable: true })
  visitantGoals: number

  @ManyToOne(type => Team)
  @JoinColumn()
  local: Team;

  @ManyToOne(type => Team)
  @JoinColumn()
  visitant: Team;

  @OneToOne(type => Referee)
  @JoinColumn()
  referee: Referee;

  @OneToMany(type => MatchEvent, event => event.match)
  events: MatchEvent[];

  @ManyToOne(type => Fixture, fixture => fixture.matches)
  fixture: Fixture;

  play(results: MatchResults) {
    this.played = true;
    this.localGoals = results.localGoals;
    this.visitantGoals = results.visitantGoals;
  };

}
