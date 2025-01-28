import { User } from "@hexagon/models/User";

export type UserData = Omit<User, 'id'>;

export interface UserRepository {
  /**
   * Modifie un utilisateur
   * @param id Identifiant de l'utilisateur
   * @param data Données de l'utilisateur à modifier
   */
  updateOne(id: number, data: UserData): Promise<User | null>
}