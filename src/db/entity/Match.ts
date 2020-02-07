import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { MatchEvent, Event } from "./MatchEvent";
import { Team } from "./Team";
import { Referee } from "./Referee";
import { Fixture } from "./Fixture";

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

  play() {
    this.played = true;
    const results = this.getResults();
    this.localGoals = results.localGoals;
    this.visitantGoals = results.visitantGoals;
  };

  getResults() {
    let localGoals = 0;
    let visitantGoals = 0;
    this.events.forEach(event => {
      if (event.event === Event.goal) {
        if (event.player.team.id === this.local.id) {
          localGoals++;
        } else {
          visitantGoals++;
        }
      }
    })
    return { localGoals, visitantGoals };
  };


}
