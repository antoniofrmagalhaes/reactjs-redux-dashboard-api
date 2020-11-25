import 'reflect-metadata'
import { container } from 'tsyringe'
import { Request, Response } from 'express'

import CreateUserService from '../../../services/CreateUserService'
import UpdateUserService from '../../../services/UpdateUserService'

class UsersController {
  public async createUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { body } = request
    const createNewUser = container.resolve(CreateUserService)
    const newUser = await createNewUser.execute(body)
    return response.json(newUser)
  }

  public async updateUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user, body } = request
    const updateUser = container.resolve(UpdateUserService)
    const updated = await updateUser.execute(user._id, body)
    return response.json(updated)
  }
}

export default new UsersController()
