import { Server } from 'socket.io'

declare global {
  namespace Express {
    interface Request {
      io: Server
      user: {
        _id: string
        recovery_token?: string
      }
    }
  }
}
