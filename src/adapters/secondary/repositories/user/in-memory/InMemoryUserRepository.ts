import { User } from "@hexagon/models/User";
import { UserData, UserRepository } from "@hexagon/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private _users = new Map<number, User>();

  public async updateOne(id: number, data: UserData) {
    const user = this._users.get(id);
    if (!user) return null;

    const updatedUser = { ...user, ...data };
    this._users.set(id, updatedUser);

    return updatedUser;
  }

  public set users(users: User[]) {
    this._users = new Map(users.map((user) => [user.id, user]));
  }
}