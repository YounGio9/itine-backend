import { z } from 'zod'

const createCategory = z.object({
    body: z.object({
        name: z.string(),
        image: z.string(),
        productId: z.number(),
    }),
})

const updateCategory = z.object({
    body: z.object({
        name: z.string().optional(),
        image: z.string().optional(),
        productId: z.number(),
    }),
})

type createCategoryType = z.infer<typeof createCategory.shape.body>

export { createCategory, updateCategory, type createCategoryType }
