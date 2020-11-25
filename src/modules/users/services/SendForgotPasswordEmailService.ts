import { Request } from 'express'
import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '../../../providers/MailProvider/IMailProvider'
import AppError from '../../../errors/AppError'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface RecoveryPasswordRequest extends Request {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: RecoveryPasswordRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("An errror occured -'-")
    }

    const { _id } = user

    const recoveryToken = await this.userTokensRepository.generateRecoveryPasswordToken(
      _id
    )

    await this.usersRepository.updateRecoveryToken(_id, recoveryToken)
    await this.mailProvider.sendMail(
      email,
      `https://reactjs-redux-dashboard.vercel.app/password/reset/${recoveryToken}`
    )
    return `https://reactjs-redux-dashboard.vercel.app/password/reset/${recoveryToken}`
  }
}

export default SendForgotPasswordEmailService
