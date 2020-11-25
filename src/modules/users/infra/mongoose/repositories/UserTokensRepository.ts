import jwt from 'jsonwebtoken'

import IUserTokensRepository from '../../../repositories/IUserTokensRepository'

import AuthConfig from '../../../../../config/AuthConfig'

class UserTokensRepository implements IUserTokensRepository {
  public async generateToken(user_id: string): Promise<string> {
    return jwt.sign({}, AuthConfig.jwt.secret, {
      subject: user_id.toString(),
      expiresIn: AuthConfig.jwt.expiresIn
    })
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async decodeToken(token: string): Promise<string | object> {
    const decoded = jwt.verify(token, AuthConfig.jwt.secret)
    return decoded
  }

  public async generateRecoveryPasswordToken(user_id: string): Promise<string> {
    return jwt.sign({}, AuthConfig.jwt.secret, {
      subject: user_id.toString(),
      expiresIn: AuthConfig.jwt.expiresIn
    })
  }

  public async verifyRecoveryPasswordToken(token: string): Promise<boolean> {
    return !!jwt.verify(token, AuthConfig.jwt.secret)
  }
}

export default UserTokensRepository
