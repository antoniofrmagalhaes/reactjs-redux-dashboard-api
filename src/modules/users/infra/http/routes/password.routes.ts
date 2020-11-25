import { Router } from 'express'

import PasswordRecoveryController from '../controllers/PasswordRecoveryController'
import hasValidToken from '../middlewares/hasValidToken'

const passwordRoutes = Router()

passwordRoutes.post('/forgot', PasswordRecoveryController.create)
passwordRoutes.put('/reset', hasValidToken, PasswordRecoveryController.update)

export default passwordRoutes
