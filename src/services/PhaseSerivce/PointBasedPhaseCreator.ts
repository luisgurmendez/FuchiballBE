import { Team } from "../../db/entity/Team";
import { PointBasedUtil } from "../../utils/PointBased/PointBasedUtil";
import { PointBased } from "../../db/entity/ChampionshipPhase/PointBased/PointBased";
import { PointBasedGroup } from "../../db/entity/ChampionshipPhase/PointBased/PointBasedGroup";
import { PhaseType } from "../../db/entity/ChampionshipPhase/Phase";
import _cloneDeep from 'lodash/cloneDeep'

const alphabet = [...'ABVDEFGHIJKLMNOPQRSTUVWXYZ']

export class PointBasedPhaseCreator {

  static createPointBasedPhase(teams: Team[], twoGamed: boolean, numOfGroups: number = 1, ): PointBased {

    const pointbased = new PointBased();
    const pointbasedGroups: PointBasedGroup[] = [];
    const groupTeams = PointBasedUtil.splitEntitiesInGroups(teams, numOfGroups);
    groupTeams.forEach((gt, i) => {
      const pointbasedGroup = new PointBasedGroup();
      pointbasedGroup.name = 'Grupo ' + alphabet[i];
      pointbasedGroup.twoGamed = twoGamed;
      pointbasedGroup.teams = _cloneDeep(gt); // SUPER WEIRD!
      pointbasedGroup.fixture = PointBasedUtil.createFixture(gt);
      pointbasedGroups.push(pointbasedGroup);
    })

    pointbased.groups = pointbasedGroups;
    pointbased.hasEnded = false;
    pointbased.type = PhaseType.pointbased;
    return pointbased;

  }

}