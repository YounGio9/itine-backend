import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import DeliveryManService from './deliveryMan.service'
import { createDeliveryMan, updateDeliveryManStatus } from './deliveryMan.validation'

class DeliveryManController implements Controller {
    public path = '/delivery-men'
    public router = Router()
    private readonly DeliveryManService = new DeliveryManService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createDeliveryMan), this.create)
        this.router.get(`${this.path}/`, verifyJwt, this.getDeliveryMen)
        this.router.post(
            `${this.path}/changeStatus`,
            zodValidator(updateDeliveryManStatus),
            this.updateStatus,
        )
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const deliveryMan = await this.DeliveryManService.create(req.body)

            return res
                .status(201)
                .json(jsonResponse('DeliveryMan created successfully', true, deliveryMan))
        } catch (error) {
            next(error)
        }
    }

    private readonly getDeliveryMen = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const deliveryMans = await this.DeliveryManService.getAllDeliveryMen()

            return res
                .status(200)
                .json(jsonResponse('DeliveryMen retrieved successfully', true, deliveryMans))
        } catch (error) {
            next(error)
        }
    }

    private readonly updateStatus = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const deliveryMan = await this.DeliveryManService.updateDeliveryManStatus(req.body)

            return res
                .status(200)
                .json(jsonResponse('DeliveryMan updated successfully', true, deliveryMan))
        } catch (error) {
            next(error)
        }
    }
}

export default DeliveryManController
