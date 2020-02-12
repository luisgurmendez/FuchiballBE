import { Phase } from "../db/entity/ChampionshipPhase/Phase";
import { Championship } from "db/entity/Championship";

class ChampionshipService {


  static createChampionship(phases: Phase[], season: string): Championship {

    const championship = new Championship();
    championship.season = season;

    // championship.phases = [];
    championship.active = true;


    return championship;

  }
}