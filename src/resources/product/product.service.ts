import prismaClient from '@utils/prisma'
import HttpException from '@utils/exceptions/http.exception'
import logger from '@/config/logger'
import cloudinary from '@utils/cloud/cloudinary.util'
import CategoryService from '@resources/category/category.service'
import type Product from './product.interface'
import { type createProductType } from './product.validation'

class ProductService {
    private readonly product = prismaClient.product
    private readonly categoryService = new CategoryService()

    /**
     * Create a new product
     */
    public async create(payload: createProductType): Promise<Product> {
        try {
            const base64Images = payload.images

            const uploadedResponses = await Promise.all(
                base64Images.map(async (img) => {
                    const result = await cloudinary.uploader.upload(img, {
                        upload_preset: 'ml_default',
                        folder: 'itine',
                    })
                    return result
                }),
            )

            const imageUrls = uploadedResponses.map((response) => response.url)

            const { categories } = payload

            const product = await this.product.create({
                data: {
                    ...payload,
                    images: imageUrls,
                    categories: {
                        connectOrCreate: categories.map((name) => ({
                            create: { name },
                            where: { name },
                        })),
                    },
                },
            })

            const fullProduct = (await this.getById(product.id)) as Product

            return fullProduct
        } catch (error) {
            logger.error(error)
            throw new HttpException(400, 'Unable to create Product')
        }
    }

    /**
     * Get all products
     */

    public async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.product.findMany({
                include: {
                    categories: true,
                },
            })

            return products.map((product) => this.serializeProduct(product))
        } catch (error) {
            logger.error(error)
            throw new HttpException(400, 'Unable to find Products')
        }
    }

    /**
     *
     * @param id
     * @returns {Product}
     */

    public async getById(id: number): Promise<Product | null> {
        try {
            const product = await this.product.findUnique({
                where: { id },
                include: {
                    categories: true,
                },
            })
            if (product) {
                return this.serializeProduct(product)
            }
            return null
        } catch (error) {
            logger.error(error)
            throw new Error('Cant find product')
        }
    }

    // Just a working version. But the logic is not perfect. Need to be refactored
    public async updateById(
        payload: Partial<createProductType> & { id: number },
    ): Promise<Product | null> {
        try {
            const retrievedProduct = await this.getById(payload.id)

            if (!retrievedProduct) {
                throw new HttpException(404, 'Product not found')
            }

            const categories = payload.categories ?? retrievedProduct.categories

            const product = await this.product.update({
                where: { id: payload.id },
                data: {
                    ...payload,

                    categories: {
                        connectOrCreate: categories.map((name) => ({
                            create: { name },
                            where: { name },
                        })),
                    },
                },
                include: {
                    categories: true,
                },
            })

            return this.serializeProduct(product)
        } catch (error: any) {
            logger.error(error)
            throw new HttpException(error.status ?? 400, error.message ?? 'Cant update product')
        }
    }

    public async deleteById(id: number): Promise<Product | null> {
        try {
            logger.info(id, 'ID')
            const product = await this.product.findUnique({ where: { id } })

            if (product == null) return null
            const deleted = await this.product.delete({
                where: { id },
                include: {
                    categories: true,
                },
            })
            return this.serializeProduct(deleted)
        } catch (error) {
            logger.error(error)
            throw new Error('Cant Delete product')
        }
    }

    public async filterProducts(
        products: Product[],
        gender: string | undefined,
        category: string | undefined,
    ): Promise<Product[]> {
        try {
            let filteredProducts: Product[] = []
            if (gender && !['man', 'woman', 'child'].includes(gender)) {
                throw new HttpException(400, `Gender ${gender} doesn't exist`)
            }
            if (gender) {
                filteredProducts = products.filter((product) =>
                    product.genders.includes(gender as any),
                )
            }

            const existingCategories = (await this.categoryService.getAllCategories()).map((cat) =>
                cat.name.toLowerCase(),
            )

            if (category && !existingCategories.includes(category.toLowerCase())) {
                throw new HttpException(400, `Category ${category} doesn't exist`)
            }

            if (category) {
                filteredProducts = products.filter((product) =>
                    product.categories
                        .map((cat) => cat.toLowerCase())
                        .includes(category.toLowerCase()),
                )
            }

            return filteredProducts
        } catch (error: any) {
            logger.error(error)
            throw new HttpException(error.status ?? 400, error.message ?? 'Unable to find Products')
        }
    }

    public serializeProduct(product: any): Product {
        return {
            ...product,
            categories: Array.from(
                new Set(product.categories.map((category: any) => category.name)),
            ),
        }
    }
}

export default ProductService
