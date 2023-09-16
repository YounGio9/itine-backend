import { z } from 'zod'

const createColor = z.object({
    body: z.object({
        code: z.string(),
        productId: z.number(),
    }),
})

const updateColor = z.object({
    body: z.object({
        code: z.string().optional(),
        productId: z.number(),
    }),
})

type createColorType = z.infer<typeof createColor.shape.body>

export { createColor, updateColor, type createColorType }
