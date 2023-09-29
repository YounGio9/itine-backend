import prismaClient from '@utils/prisma'
import logger from '@/config/logger'

class SizeService {
    private readonly size = prismaClient.size
    /**
     * Get all sizes
     */
    public async getAllSizes(): Promise<string[]> {
        try {
            const sizes = await this.size.findMany()

            const filteredSizes = Array.from(new Set(sizes.map((size) => size.label)))

            return filteredSizes
        } catch (error) {
            logger.info(error)
            throw new Error('Unable to find Sizes')
        }
    }
}

export default SizeService
