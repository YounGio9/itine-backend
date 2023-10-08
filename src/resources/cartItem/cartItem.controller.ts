import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import CartItemService from './cartItem.service'
import { createCartItem, getCartItem, updateCartItem } from './cartItem.validation'
import logger from '@/config/logger'

class CartItemController implements Controller {
    public path = '/cartItems'
    public router = Router()
    private readonly CartItemService = new CartItemService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createCartItem), verifyJwt, this.create)
        this.router.get(`${this.path}/`, zodValidator(getCartItem), verifyJwt, this.getAll)
        this.router.put(`${this.path}/`, zodValidator(updateCartItem), verifyJwt, this.update)
        this.router.delete(`${this.path}/:id`, verifyJwt, this.delete)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const cartItem = await this.CartItemService.create(req.body)

            return res
                .status(201)
                .json(jsonResponse('CartItem created successfully', true, cartItem))
        } catch (error) {
            next(error)
        }
    }

    private readonly getAll = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { userId } = req.query

            logger.info(userId, 'userId')
            let cartItems = []

            if (userId) {
                cartItems = await this.CartItemService.getByUserId(+userId)
            } else {
                cartItems = await this.CartItemService.getAllCartItems()
            }

            return res
                .status(200)
                .json(jsonResponse('CartItems retrieved successfully', true, cartItems))
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    private readonly update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const cartItem = await this.CartItemService.updateById(req.body)

            return res
                .status(200)
                .json(jsonResponse('CartItem updated successfully', true, cartItem))
        } catch (error) {
            next(error)
        }
    }

    private readonly delete = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { id } = req.params
            const cartItem = await this.CartItemService.deleteById(+id)
            if (cartItem == null) {
                return res.status(400).json(jsonResponse("CartItem doesn't exist", false))
            }
            return res.status(200).json(jsonResponse('CartItem successfully deleted', true, id))
        } catch (error) {
            next(error)
        }
    }
}

export default CartItemController
