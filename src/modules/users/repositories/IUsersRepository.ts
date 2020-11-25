import { IUser } from '../infra/mongoose/entities/schemas/User'

export default interface IUsersRepository {
  findByEmail(email: string): Promise<IUser>
  createUser(user: IUser): Promise<IUser>
  updateUser(_id: string, update: IUser): Promise<IUser>
  updatePassword(
    password: string,
    recovery_token: string,
    _id: string
  ): Promise<void>
  updateRecoveryToken(_id: string, recovery_token: string): Promise<void>
}
