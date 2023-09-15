import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import type Message from './message.interface'
import { type createMessageType } from './message.validation'

class MessageService {
    private readonly message = prismaClient.message
    /**
     * Create a new message
     */
    public async create(payload: createMessageType): Promise<Message> {
        try {
            const message = await this.message.create({
                data: {
                    ...payload,
                },
            })

            return message
        } catch (error) {
            logger.info(error)
            throw new HttpException(400, 'Unable to create Message')
        }
    }

    /**
     * Get all messages
     */

    public async getAllMessages(): Promise<Message[]> {
        try {
            const messages = await this.message.findMany()

            return messages
        } catch (error) {
            logger.info(error)
            throw new HttpException(400, 'Unable to find Messages')
        }
    }

    /**
     *
     * @param id
     * @returns {Message}
     */

    public async getById(id: number): Promise<Message | null> {
        try {
            const message = await this.message.findUnique({
                where: {
                    id,
                },
            })

            return message
        } catch (error) {
            logger.info(error)
            throw new Error('Cant find message')
        }
    }
}

export default MessageService
