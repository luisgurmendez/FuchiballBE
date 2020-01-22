import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Match } from "./Match";
import { Player } from "./Player";

enum Event {
  goal = 'goal',
  penaltyGoal = 'penalty_goal',
  penaltyMiss = 'penalty_miss',
  redCard = 'red_card',
  yellowCard = 'yellow_card'
}

@Entity()
export class MatchEvent {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Event })
  event: Event;

  @OneToMany(type => Match, match => match.events)
  match: Match;

  @OneToOne(type => Player)
  @JoinColumn()
  player: Player;

  @Column('int')
  min?: number;

}
