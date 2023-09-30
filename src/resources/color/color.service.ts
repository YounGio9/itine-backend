import prismaClient from '@utils/prisma'
import logger from '@/config/logger'
import type Color from './color.interface'

class ColorService {
    private readonly color = prismaClient.color
    /**
     * Get all colors
     */
    public async getAllColors(): Promise<Color[]> {
        try {
            const colors = await this.color.findMany()

            return colors
        } catch (error) {
            logger.info(error)
            throw new Error('Unable to find Colors')
        }
    }
}

export default ColorService
