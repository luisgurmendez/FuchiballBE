import { DateUtil } from "./DateUtil";

describe('Tests for the DateUtils module', () => {

  it('gets next specific date', () => {

    const wednesday = new Date(Date.parse('2020-01-01T00:00:00+0000'));
    const nextFriday = DateUtil.getNextSpecificDay(wednesday, 5);
    const nextWed = DateUtil.getNextSpecificDay(wednesday, 3);
    const nextNextWed = DateUtil.getNextSpecificDay(nextWed, 3);

    expect(nextFriday.getDay()).toBe(5);
    expect(nextWed.getDay()).toBe(3);
    expect(nextNextWed.getDay()).toBe(3);

  })
})