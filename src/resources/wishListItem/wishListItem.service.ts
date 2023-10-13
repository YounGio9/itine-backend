import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import ProductService from '@resources/product/product.service'
import UserService from '@resources/user/user.service'
import type WishListItem from './wishListItem.interface'
import { type createWishListItemType } from './wishListItem.validation'

class WishListItemService {
    private readonly wishListItem = prismaClient.wishListItem
    private readonly productService = new ProductService()
    private readonly userService = new UserService()

    /**
     * Create a new wishListItem
     */
    public async create(payload: createWishListItemType): Promise<WishListItem> {
        try {
            const existedUser = await this.userService.getById(payload.userId)
            const existedProduct = await this.productService.getById(payload.productId)

            if (existedProduct == null) {
                throw new HttpException(200, "Product doesn't exist")
            }

            if (existedUser == null) {
                throw new HttpException(200, "User doesn't exist")
            }
            const wishListItem = await this.wishListItem.create({
                data: payload,
            })

            return wishListItem
        } catch (error: any) {
            logger.info(error)
            throw new HttpException(error.status ?? 400, error.message)
        }
    }

    /**
     * Get all wishListItem related to a user
     */
    public async getAllWishListItems(): Promise<WishListItem[]> {
        try {
            const cities = await this.wishListItem.findMany()

            return cities
        } catch (error) {
            logger.info(error)
            throw new HttpException(400, 'Unable to find WishListItems')
        }
    }

    /**
     * Get a WishListItem by name
     *
     * @param id
     * @returns {WishListItem}
     */

    public async getByUserId(userId: number): Promise<WishListItem[]> {
        try {
            const userExist = await this.userService.getById(userId)

            if (!userExist) {
                throw new HttpException(404, "User doesn't exists")
            }
            const wishListItem = await this.wishListItem.findMany({
                where: { userId },
            })

            return wishListItem
        } catch (error: any) {
            logger.info(error)
            throw new HttpException(
                error.status ?? 400,
                error.message ?? "Can't find wishListItems",
            )
        }
    }

    public async deleteById(id: number): Promise<WishListItem | null> {
        try {
            logger.info(id, 'ID')
            const wishListItem = await this.wishListItem.findUnique({ where: { id } })

            if (wishListItem == null) return null
            const deleted = await this.wishListItem.delete({
                where: { id },
            })
            return deleted
        } catch (error) {
            logger.info(error)
            throw new Error('Cant Delete wishListItem')
        }
    }
}

export default WishListItemService
