import { User } from "@hexagon/models/User";
import { UserData, UserRepository } from "@hexagon/repositories/UserRepository";
import { promisifyResult } from "@test/promiseStubResult";

export class UserRepositoryStub implements UserRepository {
  private _updateOneData: User | null = null;
  private _updateOneParams: Array<{id: number, data: UserData}> = [];

  public async updateOne(id: number, data: UserData) {
    // BONUS : QUENETTE
    this._updateOneParams.push({id, data});
    return promisifyResult(() => {
      return this._updateOneData;
    })
  }

  public get updateOneParams() {
    return this._updateOneParams;
  }
  
  public set updateOneData(data: User | null) {
    this._updateOneData = data;
  }
}