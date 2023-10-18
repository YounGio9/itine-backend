import express, { type Application } from 'express'
import cors, { type CorsRequest } from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import type Controller from '@utils/interfaces/controller.interface'
import errorMiddleware from '@middleware/error.middleware'
import cookieParser from 'cookie-parser'
import credentials from '@middleware/credentials.middleware'
import ws from 'ws'
import CategoryService from '@resources/category/category.service'
import logger from './config/logger'
import appOrigins from './config/origins'

class App {
    public express: Application
    public port: number

    constructor(controllers: Controller[], port: number) {
        this.express = express()
        this.port = port
        this.initializeMiddleware()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }

    private readonly initializeMiddleware = (): void => {
        this.express.use(credentials)
        this.express.use(
            cors<CorsRequest>({
                origin: appOrigins,
            }),
        )
        this.express.use(compression())
        this.express.use(helmet())
        this.express.use(morgan('dev'))
        this.express.use(express.json({ limit: '50mb' }))
        this.express.use(express.urlencoded({ extended: true }))
        this.express.use(cookieParser())
    }

    private readonly initializeControllers = (controllers: Controller[]): void => {
        controllers.forEach((controller) => {
            this.express.use('/', controller.router)
        })
    }

    private readonly initializeErrorHandling = (): void => {
        this.express.use(errorMiddleware)
    }

    public listen = (): void => {
        const wsServer = new ws.Server({ noServer: true })
        wsServer.on('connection', (websocketConnection, connectionRequest) => {
            websocketConnection.on('message', async (message) => {
                let oldCategories: any[] = []
                setInterval(async () => {
                    const oldCatIds = oldCategories.map((cat) => cat.id)
                    const categories = await new CategoryService().getAllCategories()
                    categories.forEach((category) => {
                        if (!oldCatIds.includes(category.id))
                            websocketConnection.send(category.name)
                    })
                    oldCategories = categories
                }, 1000)
            })
        })

        const server = this.express.listen(this.port, () => {
            logger.info(`Server listening on PORT ${this.port}`)
        })

        server.on('upgrade', (request, socket, head) => {
            wsServer.handleUpgrade(request, socket, head, (sckt) => {
                wsServer.emit('connection', sckt, request)
            })
        })
    }
}

export default App
