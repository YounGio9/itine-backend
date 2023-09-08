import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import type { Request, Response, NextFunction } from 'express'
import { Router } from 'express'
import jsonResponse from '@utils/jsonResponse'
import HttpException from '@utils/exceptions/http.exception'
import { createUser } from './user.validation'
import UserService from './user.service'

class UserController implements Controller {
    public path = '/users'
    public router = Router()
    private readonly UserService = new UserService()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): any {
        this.router.post(`${this.path}`, zodValidator(createUser), this.create)
    }

    // eslint-disable-next-line consistent-return
    private async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const user = await this.UserService.create(req.body)

            return res.status(201).json(jsonResponse('User created successfully', true, user))
        } catch (error) {
            next(new HttpException(400, 'User creation failed'))
        }
    }
}

export default UserController
