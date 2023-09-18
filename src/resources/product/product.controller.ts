import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import ProductService from './product.service'
import { createProduct } from './product.validation'

class ProductController implements Controller {
    public path = '/products'
    public router = Router()
    private readonly ProductService = new ProductService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createProduct), this.create)
        this.router.get(`${this.path}/`, this.getProducts)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const product = await this.ProductService.create(req.body)

            return res.status(201).json(jsonResponse('Product created successfully', true, product))
        } catch (error) {
            next(error)
        }
    }

    private readonly getProducts = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const products = await this.ProductService.getAllProducts()

            return res
                .status(200)
                .json(jsonResponse('Products retrieved successfully', true, products))
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController
