import { z } from 'zod'

const createCartItem = z.object({
    body: z.object({
        userId: z.number(),
        productId: z.number(),
        quantity: z.number(),
        color: z.string(),
        size: z.string(),
    }),
})

const updateCartItem = z.object({
    body: z.object({
        id: z.number(),
        quantity: z.number(),
        color: z.string(),
        size: z.string(),
    }),
})

const getCartItem = z.object({
    query: z.object({
        userId: z.string().optional(),
    }),
})

type createCartItemType = z.infer<typeof createCartItem.shape.body>

export { createCartItem, updateCartItem, getCartItem, type createCartItemType }
