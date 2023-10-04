import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import type DeliveryMan from './deliveryMan.interface'
import {
    type updateDeliveryManStatusType,
    type createDeliveryManType,
} from './deliveryMan.validation'

class DeliveryManService {
    private readonly deliveryMan = prismaClient.deliveryMan
    /**
     * Create a new deliveryMan
     */
    public async create(payload: createDeliveryManType): Promise<DeliveryMan> {
        try {
            const deliveryMan = await this.deliveryMan.create({
                data: {
                    ...payload,
                },
            })

            return deliveryMan
        } catch (error) {
            logger.info(error)
            throw new HttpException(400, 'Unable to create DeliveryMan')
        }
    }

    /**
     * Get all deliveryMen
     *
     * @returns {DeliveryMan[]}
     */
    public async getAllDeliveryMen(): Promise<DeliveryMan[]> {
        try {
            const deliveryMans = await this.deliveryMan.findMany()

            return deliveryMans
        } catch (error) {
            logger.info(error)
            throw new HttpException(400, 'Unable to find DeliveryMans')
        }
    }

    public async updateDeliveryManStatus(
        payload: updateDeliveryManStatusType,
    ): Promise<DeliveryMan> {
        try {
            const existingDeliveryMan = await this.deliveryMan.findUnique({
                where: { id: payload.id },
            })

            if (existingDeliveryMan == null) {
                throw new HttpException(400, "Delivery Man doesn't exist")
            }
            const deliveryMan = await this.deliveryMan.update({
                where: {
                    id: payload.id,
                },
                data: {
                    status: payload.active ? 'accepted' : 'rejected',
                },
            })

            return deliveryMan
        } catch (error: any) {
            logger.info(error)
            throw new HttpException(400, error.message ?? 'Unable to update DeliveryMan')
        }
    }

    /**
     *
     * @param id
     * @returns {DeliveryMan}
     */

    public async getByEmail(email: string): Promise<DeliveryMan | null> {
        try {
            const deliveryMan = await this.deliveryMan.findUnique({
                where: {
                    email,
                },
            })

            return deliveryMan
        } catch (error) {
            logger.info(error)
            throw new Error('Cant find deliveryMan')
        }
    }
}

export default DeliveryManService
