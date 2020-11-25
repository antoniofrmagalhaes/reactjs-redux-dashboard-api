import { Request } from 'express'
import { injectable, inject } from 'tsyringe'
import bcrypt from 'bcryptjs'

import AppError from '../../../errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import { ICard, IAddress } from '../infra/mongoose/entities/schemas/User'

interface AuthRequest extends Request {
  email: string
  password: string
}

interface AuthResponse {
  user: {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    birth_date: string
    cards: ICard[]
    addresses: IAddress[]
  }
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({
    email,
    password
  }: AuthRequest): Promise<AuthResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('404 usr not found')
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new AppError('pwd failure')
    }

    const token = await this.userTokensRepository.generateToken(user._id)

    return {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        birth_date: user.birth_date,
        cards: user.cards,
        addresses: user.addresses
      },
      token
    }
  }
}

export default AuthenticateUserService
