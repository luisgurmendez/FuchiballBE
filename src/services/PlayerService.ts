import { getRepository, Repository, DeepPartial, ObjectType } from "typeorm";
import { Player } from "../db/entity/Player";

export class PlayerService {
  public repository: Repository<Player>;

  constructor() {
    this.repository = getRepository(Player);
  }
}
