

type RoundMatch<E> = [E, E]
export class IterableRoundRobin<E> implements Iterable<RoundMatch<E>[]>{

  private double: boolean;
  private topRow: E[];
  private bottomRow: E[];
  private numOfRounds: number;
  private roundIteration: number;

  constructor(entities: E[], double: boolean = false) {
    this.double = double;

    if (entities.length !== 1 && entities.length % 2 === 1) {
      entities.push(undefined); // Dummy entity to make it a pair array
    }

    this.topRow = entities.slice(0, entities.length / 2);
    this.bottomRow = entities.slice(entities.length / 2, entities.length);
    this.numOfRounds = entities.length - 1;
    this.roundIteration = 0;
  }

  public [Symbol.iterator]() {
    return this;
  }

  private isByeEntity(entity: E) {
    return entity === undefined
  }

  private addRoundMatchToRound(round: RoundMatch<E>[], roundIndex: number) {
    if (
      !this.isByeEntity(this.topRow[roundIndex]) &&
      !this.isByeEntity(this.bottomRow[roundIndex])
    ) {
      if (this.roundIteration < this.numOfRounds) {
        round.push([this.topRow[roundIndex], this.bottomRow[roundIndex]])
      } else {
        round.push([this.bottomRow[roundIndex], this.topRow[roundIndex]])
      }
    }
  }

  next(): IteratorResult<[E, E][]> {
    const robin = this.double ? 2 : 1;
    if (this.roundIteration < this.numOfRounds * robin) {
      const round: [E, E][] = [];

      for (let i = 0; i < this.topRow.length; i++) {
        this.addRoundMatchToRound(round, i)
      }

      this.shift();
      return {
        done: false,
        value: round
      }
    } else {
      return {
        done: true,
        value: []
      }
    }
  }

  private shift() {
    this.roundIteration += 1;
    const pivot = this.topRow[0];
    const lastTopElement = this.topRow.pop();
    const firstBottomElement = this.bottomRow.shift();

    this.bottomRow.push(lastTopElement);
    this.topRow.unshift(firstBottomElement);

    this.topRow[1] = firstBottomElement;
    this.topRow[0] = pivot;
  }

}