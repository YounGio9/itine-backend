import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import verifyJwt from '@middleware/verifyJwt.middleware'
import CategoryService from './category.service'
import { createCategory } from './category.validation'

class CategoryController implements Controller {
    public path = '/categories'
    public router = Router()
    private readonly CategoryService = new CategoryService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createCategory), this.create)
        this.router.get(`${this.path}/`, verifyJwt, this.getCategories)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const category = await this.CategoryService.create(req.body)

            return res
                .status(201)
                .json(jsonResponse('Category created successfully', true, category))
        } catch (error) {
            next(error)
        }
    }

    private readonly getCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const categories = await this.CategoryService.getAllCategories()

            return res
                .status(200)
                .json(jsonResponse('Categories retrieved successfully', true, categories))
        } catch (error) {
            next(error)
        }
    }
}

export default CategoryController
