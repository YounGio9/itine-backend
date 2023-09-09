import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import HttpException from '@utils/exceptions/http.exception'
import jsonResponse from '@utils/jsonResponse'
import login from './auth.validation'
import AuthService from './auth.service'

class AuthController implements Controller {
    public path = '/auth'
    public router = Router()
    private readonly AuthService = new AuthService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/login`, zodValidator(login), this.login)
    }

    private readonly login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const token = await this.AuthService.login(req.body)

            return res.status(200).json(jsonResponse('User created successfully', true, token))
        } catch (error) {
            next(new HttpException(400, 'User login failed'))
        }
    }
}

export default AuthController
