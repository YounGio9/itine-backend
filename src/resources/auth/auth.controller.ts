import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import HttpException from '@utils/exceptions/http.exception'
import jsonResponse from '@utils/jsonResponse'
import { createUser } from '@resources/user/user.validation'
import verifyJwt from '@middleware/verifyJwt.middleware'
import AuthService from './auth.service'
import { login, getProfile } from './auth.validation'

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
        this.router.get(
            `${this.path}/profile/:userType`,
            zodValidator(getProfile),
            verifyJwt,
            this.getUserProfile,
        )
        this.router.get(`${this.path}/refresh`, this.refresh)
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
            const mobileKey = req.headers['mobile-api-key']
            if (mobileKey && mobileKey === process.env.MOBILE_API_KEY) {
                const { accessToken, userType, user } = await this.AuthService.loginMobile(req.body)

                return res.status(200).json(
                    jsonResponse('User logged successfully', true, {
                        accessToken,
                        user,
                        userType,
                    }),
                )
            }
            const { accessToken, refreshToken } = await this.AuthService.login(req.body)

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: JSON.parse(process.env.COOKIE_SECURE!) as boolean,
                maxAge: 24 * 60 * 60 * 1000,
            })

            return res
                .status(200)
                .json(jsonResponse('User logged successfully', true, { accessToken }))
        } catch (error) {
            next(error)
        }
    }

    private readonly refresh = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const accessToken = await this.AuthService.refreshToken(req.cookies)
            return res.status(200).json({ accessToken })
        } catch (error: any) {
            if ([401, 403].includes(error.status)) {
                return res.sendStatus(error.status)
            }

            next(error)
        }
    }

    private readonly getUserProfile = async (
        req: Request & { user?: string },
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const user = await this.AuthService.getProfile(req.user as string, req.params.userType)

            return res.status(200).json({ ...user, password: undefined })
        } catch (error: any) {
            next(error)
        }
    }
}

export default AuthController
