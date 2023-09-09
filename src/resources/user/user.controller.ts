import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import type { Request, Response, NextFunction } from 'express'
import { Router } from 'express'
import jsonResponse from '@utils/jsonResponse'
import HttpException from '@utils/exceptions/http.exception'
import UserService from '@resources/user/user.service'
import { createUser } from './user.validation'

class UserController implements Controller {
    public path = '/users'
    public router = Router()
    private readonly UserService = new UserService()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): any {
        this.router.post(`${this.path}`, zodValidator(createUser), this.create)
        this.router.get(`${this.path}`, this.getUsers)
    }

    // eslint-disable-next-line consistent-return
    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const user = await this.UserService.create(req.body)

            return res.status(201).json(jsonResponse('User created successfully', true, user))
        } catch (error) {
            next(new HttpException(400, 'User creation failed e'))
        }
    }

    private readonly getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const users = await this.UserService.getAllUsers()

            return res.status(201).json(jsonResponse('User created successfully', true, users))
        } catch (error) {
            next(new HttpException(400, 'Cant retrieve users'))
        }
    }
}

export default UserController
