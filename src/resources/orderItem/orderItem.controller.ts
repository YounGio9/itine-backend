import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import OrderItemService from './orderItem.service'
import { createOrderItem, deleteOrderItem, getOrderItems } from './orderItem.validation'

class OrderItemController implements Controller {
    public path = '/order-items'
    public router = Router()
    private readonly orderItemService = new OrderItemService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createOrderItem), this.create)
        this.router.get(`${this.path}/`, zodValidator(getOrderItems), verifyJwt, this.getAll)
        this.router.get(`${this.path}/complete`, verifyJwt, this.getFullOrders)
        this.router.delete(
            `${this.path}/:id`,
            zodValidator(deleteOrderItem),
            verifyJwt,
            this.delete,
        )
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const orderItem = await this.orderItemService.create(req.body)

            return res
                .status(201)
                .json(jsonResponse('orderItem created successfully', true, orderItem))
        } catch (error) {
            next(error)
        }
    }

    private readonly getFullOrders = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const orderItems = await this.orderItemService.getFullOrderItems(req.query as any)

            return res
                .status(200)
                .json(jsonResponse('Order items retrieved successfully', true, orderItems))
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
            const orderItems = await this.orderItemService.getAllOrderItems(req.query as any)

            return res
                .status(200)
                .json(jsonResponse('Order Items retrieved successfully', true, orderItems))
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

            const orderItem = await this.orderItemService.deleteById(+id)

            return res
                .status(200)
                .json(jsonResponse('orderItem deleted successfully', true, orderItem))
        } catch (error) {
            next(error)
        }
    }
}

export default OrderItemController
