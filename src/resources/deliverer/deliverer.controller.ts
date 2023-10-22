import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import DelivererService from './deliverer.service'
import { createDeliverer, updateDeliverer, updateDelivererStatus } from './deliverer.validation'

class DelivererController implements Controller {
    public path = '/deliverers'
    public router = Router()
    private readonly DelivererService = new DelivererService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createDeliverer), this.create)
        this.router.get(`${this.path}/`, verifyJwt, this.getDeliverers)
        this.router.post(
            `${this.path}/change-status`,
            zodValidator(updateDelivererStatus),
            this.updateStatus,
        )
        this.router.put(`${this.path}/`, zodValidator(updateDeliverer), this.update)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const deliverer = await this.DelivererService.create(req.body)

            return res
                .status(201)
                .json(jsonResponse('Deliverer created successfully', true, deliverer))
        } catch (error) {
            next(error)
        }
    }

    private readonly getDeliverers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const deliverers = await this.DelivererService.getAllDeliverers()

            return res
                .status(200)
                .json(jsonResponse('Deliverers retrieved successfully', true, deliverers))
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
            const deliverer = await this.DelivererService.updateById(req.body)

            return res
                .status(200)
                .json(jsonResponse('Deliverer updated successfully', true, deliverer))
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
            const deliverer = await this.DelivererService.updateDelivererStatus(req.body)

            return res
                .status(200)
                .json(jsonResponse('Deliverer updated successfully', true, deliverer))
        } catch (error) {
            next(error)
        }
    }
}

export default DelivererController
