import { Match, MatchResults } from "../../db/entity/Match";
import { Event } from "../../db/entity/MatchEvent";

export class MatchUtil {

  static calculateResults(match: Match): MatchResults {
    let localGoals = 0;
    let visitantGoals = 0;
    match.events.forEach(event => {
      if (event.event === Event.goal) {
        if (event.teamId === match.local.id) {
          localGoals++;
        } else {
          visitantGoals++;
        }
      }
    })
    return { localGoals, visitantGoals };
  };


}