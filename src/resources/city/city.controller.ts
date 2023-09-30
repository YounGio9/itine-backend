import zodValidator from '@middleware/zod.middleware'
import type Controller from '@utils/interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import jsonResponse from '@utils/jsonResponse'
import CityService from './city.service'
import { createCity, deleteCity, updateCity } from './city.validation'

class CityController implements Controller {
    public path = '/cities'
    public router = Router()
    private readonly CityService = new CityService()
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/`, zodValidator(createCity), this.create)
        this.router.get(`${this.path}/`, this.getCities)
        this.router.put(`${this.path}/`, zodValidator(updateCity), this.update)
        this.router.delete(`${this.path}/:id`, zodValidator(deleteCity), this.delete)
    }

    private readonly create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const city = await this.CityService.create(req.body)

            return res.status(201).json(jsonResponse('City created successfully', true, city))
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
            const { id, name } = req.body
            const city = await this.CityService.updateById(name, id)

            return res.status(200).json(jsonResponse('City updated successfully', true, city))
        } catch (error) {
            next(error)
        }
    }

    private readonly getCities = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const cities = await this.CityService.getAllCities()

            return res.status(200).json(jsonResponse('Cities retrieved successfully', true, cities))
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
            const city = await this.CityService.deleteById(+id)
            if (city == null) {
                return res.status(400).json(jsonResponse("City doesn't exist", false))
            }
            return res.status(200).json(jsonResponse('City successfully deleted', true, id))
        } catch (error) {
            next(error)
        }
    }
}

export default CityController
