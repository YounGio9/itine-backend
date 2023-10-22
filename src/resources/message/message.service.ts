import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import SendMessageByAdminMail from '@utils/mails/functions'
import type { Message, Chat } from './message.interface'
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
            logger.error(error)
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
            logger.error(error)
            throw new HttpException(400, 'Unable to find Messages')
        }
    }

    /**
     * Get all messages
     */

    public async getChats(): Promise<Chat[]> {
        try {
            const messages = await this.message.findMany()

            const users = messages.reduce(
                (sum, message) =>
                    sum.includes(message.senderMail as never)
                        ? sum
                        : sum.concat([message.senderMail as never]),
                [],
            )

            const chats: Chat[] = []

            users.forEach((user) => {
                chats.push({
                    user,
                    messages: messages.filter((msg) => msg.senderMail === user),
                })
            })

            return chats
        } catch (error) {
            logger.error(error)
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
            logger.error(error)
            throw new Error('Cant find message')
        }
    }

    public async adminSendMessage(payload: {
        email: string
        body: string
        subject: string
    }): Promise<Message | null> {
        try {
            const { body, email, subject } = payload
            const message = await this.message.create({
                data: {
                    senderMail: email,
                    senderName: 'Admin',
                    subject,
                    body,
                },
            })

            await SendMessageByAdminMail(subject, body, email)

            return message
        } catch (error) {
            logger.error(error)
            throw new Error('Cant send message')
        }
    }
}

export default MessageService
