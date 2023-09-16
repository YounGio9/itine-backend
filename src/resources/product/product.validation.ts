import { z } from 'zod'

const createProduct = z.object({
    body: z.object({
        senderMail: z.string().email('Please enter a valid email address'),
        senderName: z.string(),
        subject: z.string(),
        body: z.string(),
    }),
})

const updateProduct = z.object({})

type createProductType = z.infer<typeof createProduct.shape.body>

export { createProduct, updateProduct, type createProductType }
