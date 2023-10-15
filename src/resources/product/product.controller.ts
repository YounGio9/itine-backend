import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import ProductService from './product.service'
import { createProduct, deleteProduct, getProducts, updateProduct } from './product.validation'

class ProductController implements Controller {
    public path = '/products'
    public router = Router()
    private readonly ProductService = new ProductService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createProduct), this.create)
        this.router.get(`${this.path}/`, zodValidator(getProducts), this.getProducts)
        this.router.put(`${this.path}/`, zodValidator(updateProduct), this.update)
        this.router.delete(`${this.path}/:id`, zodValidator(deleteProduct), this.delete)
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
            const { category, gender } = req.query
            let products = await this.ProductService.getAllProducts()
            type queryType = string | undefined

            // eslint-disable-next-line  @typescript-eslint/prefer-nullish-coalescing
            if (category || gender) {
                products = await this.ProductService.filterProducts(
                    products,
                    gender as queryType,
                    category as queryType,
                )
            }

            return res
                .status(200)
                .json(jsonResponse('Products retrieved successfully', true, products))
        } catch (error) {
            next(error)
        }
    }

    private readonly delete = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { id } = req.params
            const product = await this.ProductService.deleteById(+id)
            if (product == null) {
                return res.status(400).json(jsonResponse("Product doesn't exist", false))
            }
            return res.status(200).json(jsonResponse('Product successfully deleted', true, id))
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
            const product = await this.ProductService.updateById(req.body)

            return res.status(200).json(jsonResponse('Product successfully updated', true, product))
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController
