import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import MessageService from './message.service'
import { createMessage, replyMessage } from './message.validation'

class MessageController implements Controller {
    public path = '/messages'
    public router = Router()
    private readonly MessageService = new MessageService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createMessage), this.create)
        this.router.get(`${this.path}/`, verifyJwt, this.getMessages)
        this.router.get(`${this.path}/chats`, verifyJwt, this.getChats)
        this.router.post(`${this.path}/reply`, zodValidator(replyMessage), this.sendMessageByAdmin)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const message = await this.MessageService.create(req.body)

            return res.status(201).json(jsonResponse('Message created successfully', true, message))
        } catch (error) {
            next(error)
        }
    }

    private readonly getMessages = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const messages = await this.MessageService.getAllMessages()

            return res
                .status(200)
                .json(jsonResponse('Messages retrieved successfully', true, messages))
        } catch (error) {
            next(error)
        }
    }

    private readonly getChats = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const messages = await this.MessageService.getChats()

            return res
                .status(200)
                .json(jsonResponse('Messages retrieved successfully', true, messages))
        } catch (error) {
            next(error)
        }
    }

    private readonly sendMessageByAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const messages = await this.MessageService.adminSendMessage(req.body)

            return res
                .status(200)
                .json(jsonResponse('Messages retrieved successfully', true, messages))
        } catch (error) {
            next(error)
        }
    }
}

export default MessageController
