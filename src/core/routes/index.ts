import { Router } from 'express'

import usersRouter from '../../modules/users/infra/http/routes/users.routes'
import passwordRoutes from '../../modules/users/infra/http/routes/password.routes'
import sessionsRouter from '../../modules/users/infra/http/routes/sessions.routes'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ status: 'ok' })
})

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRoutes)

export default routes
