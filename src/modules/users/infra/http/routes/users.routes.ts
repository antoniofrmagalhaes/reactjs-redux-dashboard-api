import { Router } from 'express'

import UsersControllers from '../controllers/UsersController'
import isAuthenticated from '../middlewares/isAuthenticated'

const usersRouter = Router()

usersRouter.post('/', UsersControllers.createUser)
usersRouter.put('/', isAuthenticated, UsersControllers.updateUser)

export default usersRouter
