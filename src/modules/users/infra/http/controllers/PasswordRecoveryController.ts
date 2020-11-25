import 'reflect-metadata'
import { container } from 'tsyringe'
import { Request, Response } from 'express'

// REFACTOR

import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService'
import ResetPasswordService from '../../../services/ResetPasswordService'

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    )

    const link = await sendForgotPasswordEmail.execute(request.body)

    return response.json(link)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { _id, recovery_token } = request.user
    const { password } = request.body

    const resetPasswordService = container.resolve(ResetPasswordService)

    await resetPasswordService.execute(_id, password, recovery_token)

    return response.json({ ok: true })
  }
}

export default new SessionsController()
