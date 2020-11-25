import { injectable, inject } from 'tsyringe'

import { IUser } from '../infra/mongoose/entities/schemas/User'

import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_data: IUser): Promise<IUser> {
    const user = await this.usersRepository.createUser(user_data)
    return user
  }
}

export default CreateUserService
