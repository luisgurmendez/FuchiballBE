import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Match } from "./Match";
import { Player } from "./Player";

export enum Event {
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

  @ManyToOne(type => Match, match => match.events)
  match: Match;

  @ManyToOne(type => Player)
  player: Player;

  @Column('int')
  min?: number;

}
