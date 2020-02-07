import { Match } from '../db/entity/Match';
import moment from 'moment';
import { Team } from '../db/entity/Team';
import { Fixture } from 'db/entity/Fixture';


export class PlayoffUtils {

  /**
   * Creates a Fixture for a Playoff Phase
   * @param roundDaysOnWeek The number of the day that matches are preferable. For instance: [3,6].
   * This will be on Wednesday and Saturdays. Number 0 is Sunday.
   * @param startOn The date of the first match
   */
  static createFixture(teams: Team[], roundDaysOnWeek: number[] = [6], startOn: Date = new Date()): Fixture {
    const scheduledMatches: Match[] = []

    for (let i = 0; i < teams.length; i++) {
      let matchDate = moment(startOn);
      let roundDayOnWeekIndex = 0;
      for (let j = i + 1; j < teams.length; j++) {
        const match = new Match();
        match.local = teams[i];
        match.visitant = teams[j];

        matchDate.add(roundDayOnWeekIndex[roundDayOnWeekIndex % roundDaysOnWeek.length], 'days')

        scheduledMatches.push(match);
        roundDayOnWeekIndex++
      }
    }

    return new Fixture();
  }

}


