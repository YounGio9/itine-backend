import { z } from 'zod'

const createSize = z.object({
    body: z.object({
        label: z.string(),
        productId: z.number(),
    }),
})

const updateSize = z.object({
    body: z.object({
        label: z.string().optional(),
        productId: z.number(),
    }),
})

type createSizeType = z.infer<typeof createSize.shape.body>

export { createSize, updateSize, type createSizeType }
