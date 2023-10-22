import { z } from 'zod'

const createOrderItem = z.object({
    body: z.object({
        productId: z.number(),
        quantity: z.number(),
        price: z.number(),
        store: z.string(), // city
        selectedColor: z.string(),
        selectedSize: z.string(),
        userId: z.number(),
    }),
})

const deleteOrderItem = z.object({
    params: z.object({
        id: z.string(),
    }),
})

const getOrderItems = z.object({
    query: z.object({
        userId: z.string().optional(),
        productId: z.string().optional(),
    }),
})

const updateOrderItem = z.object({
    body: z.object({
        id: z.number(),
        productId: z.number().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
        store: z.string().optional(), // city
        selectedColor: z.string().optional(),
        selectedSize: z.string().optional(),
        userId: z.number().optional(),
    }),
})

type createOrderItemType = z.infer<typeof createOrderItem.shape.body>

export {
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    getOrderItems,
    type createOrderItemType,
}
