import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import type Order from './order.interface'
import { type createOrderType } from './order.validation'

class OrderService {
    private readonly order = prismaClient.order
    private readonly address = prismaClient.address
    /**
     * Create a new order
     */
    public async create(payload: createOrderType): Promise<Order> {
        try {
            const orderPayload = JSON.parse(JSON.stringify(payload))
            delete orderPayload.deliveryAddress
            const address = await this.address.create({
                data: {
                    ...payload.deliveryAddress,
                    Order: {
                        create: {
                            ...orderPayload,
                        },
                    },
                },
                include: {
                    Order: true,
                },
            })

            return address.Order[0]
        } catch (error) {
            logger.error(error)
            throw new HttpException(400, 'Unable to create Order')
        }
    }

    // public async update(payload: Partial<createOrderType> & { id: number }): Promise<Order> {
    //     try {
    //         const order = await this.order.update({
    //             where: {
    //                 id: payload.id,
    //             },
    //             data: {
    //                 ...payload,
    //             },
    //         })

    //         return order
    //     } catch (error) {
    //         logger.error(error)
    //         throw new HttpException(400, 'Unable to create Order')
    //     }
    // }

    /**
     * Get all orders
     * With userId and delivererId filters
     *
     * @returns {Order[]}
     */
    public async getAllOrders(filters: { userId: string; delivererId: string }): Promise<Order[]> {
        try {
            const where: any = {}
            Object.keys(filters).forEach((key: string) => {
                if (key) {
                    where[key] = parseInt(filters[key as keyof typeof filters], 10)
                }
            })
            const orders = await this.order.findMany({ where, orderBy: { createdAt: 'asc' } })

            return orders
        } catch (error) {
            logger.error(error)
            throw new HttpException(400, 'Unable to find Orders')
        }
    }

    /**
     *
     * @param userId
     * @returns {Order[]}
     */

    public async getRelatedToUser(userId: number): Promise<Order[]> {
        try {
            const orders = await this.order.findMany({
                where: {
                    userId,
                },
            })

            return orders
        } catch (error) {
            logger.error(error)
            throw new Error('Cant find order')
        }
    }

    /**
     *
     * @param delivererId
     * @returns {Order[]}
     */

    public async getRelatedToDeliverer(delivererId: number): Promise<Order[]> {
        try {
            const orders = await this.order.findMany({
                where: {
                    delivererId,
                },
            })

            return orders
        } catch (error) {
            logger.error(error)
            throw new Error('Cant find order')
        }
    }
}

export default OrderService
