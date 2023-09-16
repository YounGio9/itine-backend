import { z } from 'zod'

const createProduct = z.object({
    body: z.object({
        name: z.string(),
        cover: z.string(),
        description: z.string(),
        price: z.number(),
        images: z.array(z.string()),
        categories: z.array(z.string()),
        sizes: z.array(z.string()),
        colors: z.array(z.string()),
        availableQuantity: z.number(),
        soldOut: z.boolean(),
    }),
})

const updateProduct = z.object({})

type createProductType = z.infer<typeof createProduct.shape.body>

export { createProduct, updateProduct, type createProductType }
