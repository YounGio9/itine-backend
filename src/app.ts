import express, { Application } from 'express'
import cors, { CorsRequest } from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { Prisma } from '@prisma/client'
import compression from 'compression'
import Controller from '@utils/interfaces/controller.interface'
import ErrorMiddleware from '@middleware/error.middleware'

class App {
    public express: Application
    public port?: number

    constructor(controllers: Controller[], port: number) {
        this.express = express()
        this.port = port || 8000

        this.initializeMiddleware()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }
    private initializeMiddleware = () => {
        this.express.use(cors<CorsRequest>())
        this.express.use(compression())
        this.express.use(helmet())
        this.express.use(morgan('dev'))
        this.express.use(express.json({ limit: '50mb' }))
        this.express.use(express.urlencoded({ extended: true }))
    }

    private initializeControllers = (controllers: Controller[]) => {
        controllers.forEach((controller) => {
            this.express.use(controller.path, controller.router)
        })
    }
    private initializeErrorHandling = () => {
        this.express.use(ErrorMiddleware)
    }
}
