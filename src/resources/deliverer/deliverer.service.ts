import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import type Deliverer from './deliverer.interface'
import { type updateDelivererStatusType, type createDelivererType } from './deliverer.validation'

class DelivererService {
    private readonly deliverer = prismaClient.deliverer
    /**
     * Create a new deliverer
     */
    public async create(payload: createDelivererType): Promise<Deliverer> {
        try {
            const deliverer = await this.deliverer.create({
                data: {
                    ...payload,
                },
            })

            return deliverer
        } catch (error) {
            logger.error(error)
            throw new HttpException(400, 'Unable to create Deliverer')
        }
    }

    /**
     * Get all deliverers
     *
     * @returns {Deliverer[]}
     */
    public async getAllDeliverers(): Promise<Deliverer[]> {
        try {
            const deliverers = await this.deliverer.findMany()

            return deliverers
        } catch (error) {
            logger.error(error)
            throw new HttpException(400, 'Unable to find Deliverers')
        }
    }

    public async updateDelivererStatus(payload: updateDelivererStatusType): Promise<Deliverer> {
        try {
            const existingDeliverer = await this.deliverer.findUnique({
                where: { id: payload.id },
            })

            if (existingDeliverer == null) {
                throw new HttpException(400, "Delivery Man doesn't exist")
            }
            const deliverer = await this.deliverer.update({
                where: {
                    id: payload.id,
                },
                data: {
                    status: payload.active ? 'accepted' : 'rejected',
                },
            })

            return deliverer
        } catch (error: any) {
            logger.error(error)
            throw new HttpException(
                error.status ?? 400,
                error.message ?? 'Unable to update Deliverer',
            )
        }
    }

    /**
     *
     * @param id
     * @returns {Deliverer}
     */

    public async getByEmail(email: string): Promise<Deliverer | null> {
        try {
            const deliverer = await this.deliverer.findUnique({
                where: {
                    email,
                },
            })

            return deliverer
        } catch (error) {
            logger.error(error)
            throw new Error('Cant find deliverer')
        }
    }
}

export default DelivererService
