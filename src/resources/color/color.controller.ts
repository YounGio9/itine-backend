import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import ColorService from './color.service'

class ColorController implements Controller {
    public path = '/colors'
    public router = Router()
    private readonly ColorService = new ColorService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}/`, verifyJwt, this.getColors)
    }

    private readonly getColors = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const colors = await this.ColorService.getAllColors()

            return res.status(200).json(jsonResponse('Colors retrieved successfully', true, colors))
        } catch (error) {
            next(error)
        }
    }
}

export default ColorController
