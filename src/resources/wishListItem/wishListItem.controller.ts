import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import WishListItemService from './wishListItem.service'
import { createWishListItem, deleteWishListItem, getByUserId } from './wishListItem.validation'

class WishListItemController implements Controller {
    public path = '/wishListItems'
    public router = Router()
    private readonly WishListItemService = new WishListItemService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createWishListItem), this.create)
        this.router.get(`${this.path}/`, this.getWishListItems)
        this.router.get(`${this.path}/:id`, zodValidator(getByUserId), this.getRelatedToUser)
        this.router.delete(`${this.path}/:id`, zodValidator(deleteWishListItem), this.delete)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const wishListItem = await this.WishListItemService.create(req.body)
            return res
                .status(201)
                .json(jsonResponse('WishListItem created successfully', true, wishListItem))
        } catch (error) {
            next(error)
        }
    }

    private readonly getWishListItems = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const wishListItems = await this.WishListItemService.getAllWishListItems()

            return res
                .status(200)
                .json(jsonResponse('WishListItems retrieved successfully', true, wishListItems))
        } catch (error) {
            next(error)
        }
    }

    private readonly getRelatedToUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { id } = req.params
            const wishListItems = await this.WishListItemService.getByUserId(+id)

            return res
                .status(200)
                .json(jsonResponse('WishListItems retrieved successfully', true, wishListItems))
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
            const wishListItem = await this.WishListItemService.deleteById(+id)
            if (wishListItem == null) {
                return res.status(400).json(jsonResponse("WishListItem doesn't exist", false))
            }
            return res.status(200).json(jsonResponse('WishListItem successfully deleted', true, id))
        } catch (error) {
            next(error)
        }
    }
}

export default WishListItemController
