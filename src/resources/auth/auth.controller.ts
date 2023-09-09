import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import HttpException from '@utils/exceptions/http.exception'
import jsonResponse from '@utils/jsonResponse'
import { createUser } from '@resources/user/user.validation'
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
        this.router.post(`${this.path}/register`, zodValidator(createUser), this.register)
        this.router.post(`${this.path}/login`, zodValidator(login), this.login)
    }

    private readonly register = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const user = await this.AuthService.register(req.body)

            return res.status(200).json(jsonResponse('User created successfully', true, user))
        } catch (error: any) {
            next(new HttpException(error.status, error.message))
        }
    }

    private readonly login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { accessToken, refreshToken } = await this.AuthService.login(req.body)

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

            return res
                .status(200)
                .json(jsonResponse('User logged successfully', true, { accessToken }))
        } catch (error: any) {
            next(error)
        }
    }
}

export default AuthController
