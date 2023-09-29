import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import SizeService from './size.service'

class SizeController implements Controller {
    public path = '/sizes'
    public router = Router()
    private readonly SizeService = new SizeService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}/`, verifyJwt, this.getSizes)
    }

    private readonly getSizes = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const sizes = await this.SizeService.getAllSizes()

            return res.status(200).json(jsonResponse('Sizes retrieved successfully', true, sizes))
        } catch (error) {
            next(error)
        }
    }
}

export default SizeController
