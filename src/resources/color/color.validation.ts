import { z } from 'zod'

const createColor = z.object({
    body: z.object({
        code: z.string(),
    }),
})

const updateColor = z.object({
    body: z.object({
        code: z.string().optional(),
    }),
})

type createColorType = z.infer<typeof createColor.shape.body>

export { createColor, updateColor, type createColorType }
