import { injectable, inject } from 'tsyringe'

import { IUser } from '../infra/mongoose/entities/schemas/User'

import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(_id: string, update: IUser): Promise<IUser> {
    const updated_user = await this.usersRepository.updateUser(_id, update)
    return updated_user
  }
}

export default CreateUserService
