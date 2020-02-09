import { Match } from '../../db/entity/Match';
import moment from 'moment';
import { Team } from '../../db/entity/Team';
import { Fixture } from '../../db/entity/Fixture';
import { IterableRoundRobin } from '../RoundRobin/IterableRoundRobin';
import { DateUtil } from '../DateUtil/DateUtil';

export class PlayoffUtils {

  /**
   * Creates a Fixture for a Playoff Phase
   * @param roundDaysOnWeek The number of the day that matches are preferable. For instance: [3,6].
   * This will be on Wednesday and Saturdays. Number 0 is Sunday.
   * @param startOn The date of the first match
   */
  static createFixture(teams: Team[], roundDaysOnWeek: number[] = [6], startOn: Date = new Date()): Fixture {
    const scheduledMatches: Match[] = []
    const roundRobin = new IterableRoundRobin(teams)
    let dateHelper = startOn;
    let roundNumber = 0;

    for (let round of roundRobin) {

      const roundDayIndex = roundNumber % (roundDaysOnWeek.length);
      dateHelper = DateUtil.getNextSpecificDay(dateHelper, roundDaysOnWeek[roundDayIndex])

      round.forEach(roundMatch => {
        const match = new Match()
        match.local = roundMatch[0];
        match.visitant = roundMatch[1];
        match.startsAt = dateHelper;
        scheduledMatches.push(match)
      })

      roundNumber++;
    }

    const fixture = new Fixture();
    fixture.matches = scheduledMatches
    return fixture;
  }

}


