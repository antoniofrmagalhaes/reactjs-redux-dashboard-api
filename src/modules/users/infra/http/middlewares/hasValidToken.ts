import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '../../../../../errors/AppError'
import authConfig from '../../../../../config/AuthConfig'

interface IPayload {
  iat: number
  exp: number
  sub: string
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('JWT is missing', 401) // Change error message
  }
  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded as IPayload
    request.user = { _id: sub, recovery_token: token }
    next()
  } catch {
    throw new AppError('Invalid JWT', 401) // Change error message
  }
}
