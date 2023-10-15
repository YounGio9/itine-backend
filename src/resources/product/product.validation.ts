import { z } from 'zod'

const createProduct = z.object({
    body: z.object({
        name: z.string(),
        cover: z.number(),
        description: z.string(),
        price: z.number(),
        images: z.array(z.string()),
        categories: z.array(z.string()),
        sizes: z.array(z.string()),
        colors: z.array(z.string()),
        availableQuantity: z.number(),
        genders: z.array(z.enum(['man', 'woman', 'child'])),
        soldOut: z.boolean(),
        cities: z.array(z.string()),
    }),
})

const deleteProduct = z.object({
    params: z.object({
        id: z.string(),
    }),
})

const getProducts = z.object({
    query: z.object({
        category: z.string().optional(),
        gender: z.string().optional(),
    }),
})

const updateProduct = z.object({
    body: z.object({
        id: z.number(),
        name: z.string().optional(),
        cover: z.number().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        categories: z.array(z.string()).optional(),
        sizes: z.array(z.string()).optional(),
        colors: z.array(z.string()).optional(),
        availableQuantity: z.number().optional(),
        genders: z.array(z.enum(['man', 'woman', 'child'])).optional(),
        soldOut: z.boolean().optional(),
        cities: z.array(z.string()).optional(),
    }),
})

type createProductType = z.infer<typeof createProduct.shape.body>

export { createProduct, getProducts, deleteProduct, updateProduct, type createProductType }
