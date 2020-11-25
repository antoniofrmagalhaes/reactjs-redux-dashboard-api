/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import io from 'socket.io'
import { Server } from 'http'

import routes from './routes'
import AppError from '../errors/AppError'

class App {
  public app: express.Application

  public server: Server

  private io: io.Server

  public PORT = 4000

  constructor() {
    this.app = express()
    this.server = new Server(this.app)
    this.io = io(this.server, {
      serveClient: false,
      origins: '*:*',
      transports: ['polling'],
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false
    })
    this.middlewares()
    this.socket()
    this.routes()
    this.globalErrorHandler()
    this.mongoDB()
  }

  private socket(): void {
    this.io = io(this.server)
  }

  private middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      req.io = this.io
      next()
    })
  }

  private routes(): void {
    this.app.use(routes)
  }

  private globalErrorHandler(): void {
    this.app.use(
      (e: Error, request: Request, response: Response, _: NextFunction) => {
        if (e instanceof AppError) {
          return response.status(e.statusCode).json({
            status: 'error',
            message: e.message
          })
        }
        return response.status(500).json({
          status: 'error',
          message: e.message
        })
      }
    )
  }

  private mongoDB(): void {
    mongoose.connect(`mongodb://localhost:27017/dashboard`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  }
}

export default new App().server
