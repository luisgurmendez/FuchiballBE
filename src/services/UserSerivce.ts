import { User } from "../db/entity/User";
import { BaseService } from "./BaseService";
import { Player } from "../db/entity/Player";

export class UserService extends BaseService<User> {

  constructor() {
    super(User);
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user && user.password === password;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { username: username } })
  }

  async getAllPlayersOfUser(userId: string): Promise<Player[] | undefined> {
    const user = await this.one(userId, { relations: ['players', 'player.team'] });
    if (user) {
      return user.players;
    }
    return undefined;
  }
}