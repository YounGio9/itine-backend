import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import OrderService from './order.service'
import { createOrder, getOrders, updateOrder } from './order.validation'

class OrderController implements Controller {
    public path = '/orders'
    public router = Router()
    private readonly OrderService = new OrderService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createOrder), this.create)
        this.router.get(`${this.path}/`, zodValidator(getOrders), verifyJwt, this.getOrders)
        this.router.put(`${this.path}/`, zodValidator(updateOrder), verifyJwt, this.update)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const order = await this.OrderService.create(req.body)

            return res.status(201).json(jsonResponse('Order created successfully', true, order))
        } catch (error) {
            next(error)
        }
    }

    private readonly update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const order = await this.OrderService.update(req.body)

            return res.status(201).json(jsonResponse('Order created successfully', true, order))
        } catch (error) {
            next(error)
        }
    }

    private readonly getOrders = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const orders = await this.OrderService.getAllOrders(req.query as any)

            return res.status(200).json(jsonResponse('Orders retrieved successfully', true, orders))
        } catch (error) {
            next(error)
        }
    }
}

export default OrderController
