import { PointBasedUtil } from "./PointBasedUtil";

describe('Tests for the PointBasedUtil module', () => {

  it('Split groups in odd number', () => {

    const teams = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const groups = PointBasedUtil.splitEntitiesInGroups(teams, 5);
    expect(groups.length).toBe(5);
    groups.forEach(group => {
      expect([2, 3]).toContain(group.length);
    })
  })

  it('Split groups in pair number', () => {

    const teams = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const groups = PointBasedUtil.splitEntitiesInGroups(teams, 2);
    expect(groups.length).toBe(2);
    groups.forEach(group => {
      expect(group.length).toBe(5);
    })
  })

  it('Split in one group', () => {

    const teams = ['A', 'B', 'C', 'D', 'E'];
    const groups = PointBasedUtil.splitEntitiesInGroups(teams, 1);
    expect(groups.length).toBe(1);
    expect(groups[0].length).toBe(5);
  })

  it('Most common case two groups of 6 teams', () => {

    const teams = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'G'];
    const groups = PointBasedUtil.splitEntitiesInGroups(teams, 2);
    expect(groups.length).toBe(2);
    expect(groups[0].length).toBe(6);
    expect(groups[1].length).toBe(6);
  })

})