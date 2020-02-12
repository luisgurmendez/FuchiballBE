import { RoundRobin } from "./RoundRobin";

describe('Tests for the RoundRobin module', () => {

  it('Matchup rounds', () => {

    const teams = ['A', 'B', 'C', 'D'];
    const rr = new RoundRobin(teams);
    const rounds = rr.getRounds();

    expect(rounds.length).toBe(3);
    //@ts-ignore
    const numberOfMatches = rounds.flatMap(round => round);
    expect(numberOfMatches.length).toBe(6)
  })

  it('Double match rounds', () => {

    const teams = ['A', 'B', 'C', 'D'];
    const rr = new RoundRobin(teams, true);
    const rounds = rr.getRounds();
    expect(rounds.length).toBe(6);
    //@ts-ignore
    const numberOfMatches = rounds.flatMap(round => round);
    expect(numberOfMatches.length).toBe(12)

    const numOfLocals = numberOfMatches.reduce(function (acc, curr) {
      if (acc[curr[0]] === undefined) {
        acc[curr[0]] = 1;
      } else {
        acc[curr[0]] += 1;
      }
      return acc;
    }, {});

    const numOfVisitants = numberOfMatches.reduce(function (acc, curr) {
      if (acc[curr[1]] === undefined) {
        acc[curr[1]] = 1;
      } else {
        acc[curr[1]] += 1;
      }
      return acc;
    }, {});

    expect(numOfLocals['A']).toBe(3)
    expect(numOfLocals['B']).toBe(3)
    expect(numOfLocals['C']).toBe(3)
    expect(numOfLocals['D']).toBe(3)

    expect(numOfVisitants['A']).toBe(3)
    expect(numOfVisitants['B']).toBe(3)
    expect(numOfVisitants['C']).toBe(3)
    expect(numOfVisitants['D']).toBe(3)

  })

})