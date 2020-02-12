import { Team } from "../../db/entity/Team";
import { PointBasedUtil } from "../../utils/PointBased/PointBasedUtil";
import { PointBased } from "../../db/entity/ChampionshipPhase/PointBased/PointBased";
import { PointBasedGroup } from "../../db/entity/ChampionshipPhase/PointBased/PointBasedGroup";
import { PhaseType } from "../../db/entity/ChampionshipPhase/Phase";
import _cloneDeep from 'lodash/cloneDeep'
export class PointBasedPhaseCreator {

  static createPointBasedPhase(teams: Team[], name: string, twoGamed: boolean, numOfGroups: number = 1, ): PointBased {

    const pointbased = new PointBased();
    const pointbasedGroups: PointBasedGroup[] = [];
    const groupTeams = PointBasedUtil.splitEntitiesInGroups(teams, numOfGroups);
    console.log('HERE', JSON.stringify(groupTeams));
    groupTeams.forEach(gt => {
      console.log(gt.length);
      console.log('GT', JSON.stringify(gt))
      const pointbasedGroup = new PointBasedGroup();
      pointbasedGroup.name = name; //TODO
      pointbasedGroup.twoGamed = twoGamed;
      pointbasedGroup.teams = _cloneDeep(gt); // SUPER WEIRD!
      pointbasedGroup.fixture = PointBasedUtil.createFixture(gt);
      pointbasedGroups.push(pointbasedGroup);

      console.log('HERE@', JSON.stringify(pointbasedGroup));
    })

    pointbased.groups = pointbasedGroups;
    pointbased.hasEnded = false;
    pointbased.type = PhaseType.pointbased;
    return pointbased;

  }

}