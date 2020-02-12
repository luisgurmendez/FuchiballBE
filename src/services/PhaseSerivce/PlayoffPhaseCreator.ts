import { Team } from "../../db/entity/Team";
import { PlayoffUtil } from "../../utils/PlayoffUtil/PlayoffUtil";
import { Playoffs } from "../../db/entity/ChampionshipPhase/Playoffs/Playoffs";
import { PlayoffGroup } from "../../db/entity/ChampionshipPhase/Playoffs/PlayoffGroup";
import { PhaseType } from "../../db/entity/ChampionshipPhase/Phase";
import _cloneDeep from 'lodash/cloneDeep'
export class PlayoffPhaseCreator {

  static createPlayoffPhase(teams: Team[], name: string, twoGamed: boolean, numOfGroups: number = 1, ): Playoffs {

    const playoff = new Playoffs();
    const playoffGroups: PlayoffGroup[] = [];
    const groupTeams = PlayoffUtil.splitEntitiesInGroups(teams, numOfGroups);
    console.log('HERE', JSON.stringify(groupTeams));
    groupTeams.forEach(gt => {
      console.log(gt.length);
      console.log('GT', JSON.stringify(gt))
      const playoffGroup = new PlayoffGroup();
      playoffGroup.name = name; //TODO
      playoffGroup.twoGamed = twoGamed;
      playoffGroup.teams = _cloneDeep(gt); // SUPER WEIRD!
      playoffGroup.fixture = PlayoffUtil.createFixture(gt);
      playoffGroups.push(playoffGroup);

      console.log('HERE@', JSON.stringify(playoffGroup));
    })

    playoff.groups = playoffGroups;
    playoff.hasEnded = false;
    playoff.type = PhaseType.playoff;
    return playoff;

  }

}