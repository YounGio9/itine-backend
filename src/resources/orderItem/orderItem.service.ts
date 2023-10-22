import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import CityService from '@resources/city/city.service'
import type OrderItem from './orderItem.interface'
import { type createOrderItemType } from './orderItem.validation'
import UserService from '@resources/user/user.service'
import ProductService from '@resources/product/product.service'

class OrderItemService {
    private readonly orderItem = prismaClient.orderItem
    private readonly cityService = new CityService()
    private readonly userService = new UserService()
    private readonly productService = new ProductService()

    /**
     * Create a new orderItem
     */
    public async create(payload: createOrderItemType): Promise<OrderItem> {
        try {
            const retrievedCity = await this.cityService.getByName(payload.store)
            const retrievedUser = await this.userService.getById(payload.userId)
            const retrievedProduct = await this.productService.getById(payload.productId)
            if (!retrievedCity) {
                throw new HttpException(404, `City ${payload.store} doesn't exists`)
            }
            if (!retrievedUser) {
                throw new HttpException(404, `User doesn't exists`)
            }
            if (!retrievedProduct) {
                throw new HttpException(404, `Product doesn't exists`)
            }
            const orderItem = await this.orderItem.create({
                data: {
                    ...payload,
                },
            })

            return orderItem
        } catch (error: any) {
            logger.error(error)
            throw new HttpException(
                error.status ?? 400,
                error.message ?? 'Unable to create OrderItem',
            )
        }
    }

    /**
     * Get all orderItems
     */

    public async getAllOrderItems(filters: {
        userId: string
        productId: string
    }): Promise<OrderItem[]> {
        try {
            const where: any = {}
            Object.keys(filters).forEach((key: string) => {
                if (key) {
                    where[key] = parseInt(filters[key as keyof typeof filters], 10)
                }
            })
            const orderItems = await this.orderItem.findMany({ where })

            return orderItems
        } catch (error: any) {
            logger.error(error)
            throw new HttpException(400, 'Unable to find OrderItems')
        }
    }

    /**
     * Get all orderItems with product
     */

    public async getFullOrderItems(filters: {
        userId: string
        productId: string
    }): Promise<OrderItem[]> {
        try {
            const where: any = {}
            Object.keys(filters).forEach((key: string) => {
                if (key) {
                    where[key] = parseInt(filters[key as keyof typeof filters], 10)
                }
            })
            const orderItems = await this.orderItem.findMany({ where, include: { product: true } })

            return orderItems
        } catch (error) {
            logger.error(error)
            throw new HttpException(400, 'Unable to find OrderItems')
        }
    }

    /**
     * Delete an orderItem
     */

    public async deleteById(id: number): Promise<OrderItem> {
        try {
            const retrievedOrderItem = await this.orderItem.findUnique({ where: { id } })

            if (!retrievedOrderItem) {
                throw new HttpException(404, "Order Item doesn't exists")
            }
            const deletedItem = await this.orderItem.delete({ where: { id } })

            return deletedItem
        } catch (error: any) {
            logger.error(error)
            throw new HttpException(error.status ?? 400, 'Unable to delete OrderItem')
        }
    }

    /**
     *
     * @param id
     * @returns {OrderItem}
     */

    public async getById(id: number): Promise<OrderItem | null> {
        try {
            const orderItem = await this.orderItem.findUnique({
                where: {
                    id,
                },
            })

            return orderItem
        } catch (error) {
            logger.error(error)
            throw new Error('Cant find orderItem')
        }
    }
}

export default OrderItemService
