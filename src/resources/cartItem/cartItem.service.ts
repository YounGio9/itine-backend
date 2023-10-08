import prismaClient from '@utils/prisma'
import ProductService from '@resources/product/product.service'
import UserService from '@resources/user/user.service'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import { type createCartItemType } from './cartItem.validation'
import type CartItem from './cartItem.interface'

class CartItemService {
    private readonly cartItem = prismaClient.cartItem
    private readonly productService = new ProductService()
    private readonly userService = new UserService()
    /**
     * Create a new cartItem
     */
    public async create(payload: createCartItemType): Promise<CartItem> {
        try {
            const existingUser = await this.userService.getById(payload.userId)

            const existingProduct = await this.productService.getById(payload.productId)

            if (!existingUser) {
                throw new HttpException(400, "User doesn't exist")
            }
            if (!existingProduct) {
                throw new HttpException(400, "Product doesn't exist")
            }

            const cartItem = await this.cartItem.create({
                data: {
                    ...payload,
                },
                include: {
                    product: {
                        include: {
                            categories: true,
                            colors: true,
                            sizes: true,
                        },
                    },
                },
            })

            return this.serializeCartItem(cartItem)
        } catch (error: any) {
            throw new HttpException(error.status ?? 400, error.message ?? "Can't create a cartItem")
        }
    }

    public async getAllCartItems(): Promise<CartItem[]> {
        try {
            const cartItems = await this.cartItem.findMany()

            return cartItems.map((item) => this.serializeCartItem(item))
        } catch (error) {
            throw new Error('Unable to find CartItems')
        }
    }

    public async getById(id: number): Promise<CartItem | null> {
        try {
            const cartItem = await this.cartItem.findUnique({
                where: {
                    id,
                },
            })

            return this.serializeCartItem(cartItem)
        } catch (error) {
            throw new Error('Cant find cartItem')
        }
    }

    public async getByUserId(id: number): Promise<CartItem[]> {
        try {
            const cartItems = await this.cartItem.findMany({
                where: { userId: id },
                include: {
                    product: {
                        include: {
                            categories: true,
                            colors: true,
                            sizes: true,
                        },
                    },
                },
            })

            return cartItems.map((item) => this.serializeCartItem(item))
        } catch (error) {
            logger.info(error)
            throw new Error('Cant find cartItems')
        }
    }

    public async updateById(
        data: Partial<{ id: number; quantity: number; color: string; size: string }>,
    ): Promise<CartItem> {
        try {
            const existingCart = await this.cartItem.findUnique({ where: { id: data.id } })

            if (!existingCart) {
                throw new HttpException(404, "CartItem doesn't exists")
            }
            const updated = await this.cartItem.update({
                where: { id: data.id },
                data,
                include: {
                    product: {
                        include: {
                            categories: true,
                            colors: true,
                            sizes: true,
                        },
                    },
                },
            })

            return this.serializeCartItem(updated)
        } catch (error: any) {
            throw new HttpException(error.status ?? 400, error.message ?? "Can't update cartItem")
        }
    }

    public async deleteById(id: number): Promise<CartItem | null> {
        try {
            const cartItem = await this.cartItem.findUnique({ where: { id } })

            if (cartItem == null) return null
            const deleted = await this.cartItem.delete({
                where: { id },
                include: {
                    product: {
                        include: {
                            categories: true,
                            colors: true,
                            sizes: true,
                        },
                    },
                },
            })
            return this.serializeCartItem(deleted)
        } catch (error) {
            logger.info(error)
            throw new Error('Cant Delete cartItem')
        }
    }

    public serializeCartItem(cartItem: any): CartItem {
        const finalResult: CartItem = JSON.parse(JSON.stringify(cartItem))

        finalResult.product = this.productService.serializeProduct(cartItem.product)

        return finalResult
    }
}

export default CartItemService
