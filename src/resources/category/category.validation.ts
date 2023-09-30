import { z } from 'zod'

const createCategory = z.object({
    body: z.object({
        name: z.string(),
        image: z.string(),
        productId: z.number().optional(),
    }),
})

const updateCategory = z.object({
    body: z.object({
        name: z.string().optional(),
        image: z.string().optional(),
        productId: z.number(),
    }),
})

const deleteCategory = z.object({
    params: z.object({
        id: z.string(),
    }),
})

type createCategoryType = z.infer<typeof createCategory.shape.body>

export { createCategory, deleteCategory, updateCategory, type createCategoryType }
