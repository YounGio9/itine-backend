import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import type City from './city.interface'
import { type createCityType } from './city.validation'

class CityService {
    private readonly city = prismaClient.city

    /**
     * Create a new city
     */
    public async create(payload: createCityType): Promise<City> {
        try {
            const city = await this.city.create({
                data: payload,
            })

            return city
        } catch (error) {
            logger.info(error)
            throw new HttpException(400, 'Unable to create City')
        }
    }

    /**
     * Get all cities
     */

    public async getAllCities(): Promise<City[]> {
        try {
            const cities = await this.city.findMany()

            return cities
        } catch (error) {
            logger.info(error)
            throw new HttpException(400, 'Unable to find Cities')
        }
    }

    /**
     * Get a City by name
     *
     * @param id
     * @returns {City}
     */

    public async getByName(name: string): Promise<City | null> {
        try {
            const city = await this.city.findUnique({
                where: { name },
            })

            return city
        } catch (error) {
            logger.info(error)
            throw new Error('Cant find city')
        }
    }

    public async deleteById(id: number): Promise<City | null> {
        try {
            logger.info(id, 'ID')
            const city = await this.city.findUnique({ where: { id } })

            if (city == null) return null
            const deleted = await this.city.delete({
                where: { id },
            })
            return deleted
        } catch (error) {
            logger.info(error)
            throw new Error('Cant Delete city')
        }
    }
}

export default CityService
