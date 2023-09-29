import prismaClient from '@utils/prisma'
import logger from '@/config/logger'
import cloudinary from '@utils/cloud/cloudinary.util'
import type Category from './category.interface'
import { type createCategoryType } from './category.validation'

class CategoryService {
    private readonly category = prismaClient.category
    /**
     * Create a new category
     */
    public async create(payload: createCategoryType): Promise<Category> {
        try {
            const categoryImage = payload.image
            const uploadedResponse = await cloudinary.uploader.upload(categoryImage, {
                upload_preset: 'ml_default',
                folder: 'itine',
            })

            const imageUrl = uploadedResponse.url
            const category = await this.category.create({
                data: {
                    ...payload,
                    image: imageUrl,
                },
            })

            return category
        } catch (error) {
            logger.info(error)
            throw new Error('Unable to create Category')
        }
    }

    public async getAllCategories(): Promise<Category[]> {
        try {
            const categories = await this.category.findMany()

            return categories
        } catch (error) {
            logger.info(error)
            throw new Error('Unable to find Categories')
        }
    }

    public async getByName(name: string): Promise<Category | null> {
        try {
            const category = await this.category.findUnique({
                where: {
                    name,
                },
            })

            return category
        } catch (error) {
            logger.info(error)
            throw new Error('Cant find category')
        }
    }

    public async updateByName(name: string, data: Partial<Category>): Promise<void> {
        try {
            await this.category.update({
                where: { name },
                data,
            })
        } catch (error) {
            logger.info(error)
            throw new Error('Cant update category')
        }
    }
}

export default CategoryService
