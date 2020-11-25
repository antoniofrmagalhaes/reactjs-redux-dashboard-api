import { container } from 'tsyringe'
import '../modules/users/providers'

import UsersRepository from '../modules/users/infra/mongoose/repositories/UsersRepository'
import IUsersRepository from '../modules/users/repositories/IUsersRepository'
import UserTokensRepository from '../modules/users/infra/mongoose/repositories/UserTokensRepository'
import IUserTokensRepository from '../modules/users/repositories/IUserTokensRepository'
import EtherealMailProvider from '../providers/MailProvider/EtherealMailProvider/EtherealMailProvider'
import IMailProvider from '../providers/MailProvider/IMailProvider'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)
