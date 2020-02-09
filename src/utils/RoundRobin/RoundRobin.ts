import { IterableRoundRobin } from "./IterableRoundRobin";

export class RoundRobin<E>{

  private iterableRoundRobin: IterableRoundRobin<E>;

  constructor(entities: E[], double: boolean = false) {
    this.iterableRoundRobin = new IterableRoundRobin(entities, double);
  }

  getRounds(): [E, E][][] {
    const rounds: [E, E][][] = [];
    for (let round of this.iterableRoundRobin) {
      rounds.push(round)
    }
    return rounds;
  }

}