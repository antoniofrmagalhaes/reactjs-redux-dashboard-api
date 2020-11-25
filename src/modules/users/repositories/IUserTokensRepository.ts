/* eslint-disable @typescript-eslint/ban-types */
export default interface IUserTokensRepository {
  generateToken(user_id: string): Promise<string>
  generateRecoveryPasswordToken(user_id: string): Promise<string>
  verifyRecoveryPasswordToken(token: string): Promise<boolean>
  decodeToken(token: string): Promise<string | object>
}
