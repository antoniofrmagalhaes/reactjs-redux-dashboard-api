import 'reflect-metadata'
import { container } from 'tsyringe'
import { Request, Response } from 'express'

// REFACTOR

import AuthenticateUserService from '../../../services/AuthenticateUserService'

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authenticate = container.resolve(AuthenticateUserService)

    const user = await authenticate.execute(request.body)

    return response.json(user)
  }
}

export default new SessionsController()
