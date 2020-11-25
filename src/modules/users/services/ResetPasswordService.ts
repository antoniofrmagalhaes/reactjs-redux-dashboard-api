import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute(
    _id: string,
    password: string,
    recovery_token: string
  ): Promise<void> {
    const hash = await this.hashProvider.generateHash(password)
    await this.usersRepository.updatePassword(_id, hash, recovery_token)
  }
}

export default ResetPasswordService
