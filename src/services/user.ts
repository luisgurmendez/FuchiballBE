import { User } from "../db/entity/User";
import { BaseService } from "./base";

export class UserService extends BaseService<User> {

  constructor() {
    super(User);
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user && user.password === password;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.repository.findOne({ where: { username: username } })
  }
}