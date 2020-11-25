import AppError from '../../../../../errors/AppError'
import User, { IUser } from '../entities/schemas/User'

class UsersRepository {
  public async findByEmail(email: string): Promise<IUser> {
    return User.findOne({ email }).select('+password')
  }

  public async createUser(user_data: IUser): Promise<IUser> {
    const user = await User.create(user_data)
    user.password = undefined
    return user
  }

  public async updateUser(_id: string, update: IUser): Promise<IUser> {
    return User.findOneAndUpdate({ _id }, update, {
      new: true
    })
  }

  public async updatePassword(
    _id: string,
    password: string,
    recovery_token: string
  ): Promise<void> {
    if (!recovery_token) {
      throw new AppError('no token provided')
    }

    const user = await User.findById(_id).select('+password')

    if (!user) {
      throw new AppError('user not found')
    }

    if (user.recovery_token !== recovery_token) {
      throw new AppError('invalid token')
    }

    const updated = Object.assign(user, {
      password,
      recovery_token: ''
    })

    await User.findOneAndUpdate({ _id }, updated, {
      new: true
    }).select('+password')
  }

  public async updateRecoveryToken(
    _id: string,
    recovery_token: string
  ): Promise<void> {
    await User.findOneAndUpdate(
      { _id },
      {
        recovery_token
      }
    )
  }
}

export default UsersRepository
