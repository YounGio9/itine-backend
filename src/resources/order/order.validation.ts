import { z } from 'zod'

const createOrder = z.object({
    body: z.object({
        totalPrice: z.number(),
        deliveryFees: z.number(),
        status: z.enum(['INACTIVE', 'ACTIVE', 'COMPLETED', 'CANCELLED']),
        transactionReference: z.string(),
        deliveryAddress: z.object({
            fullName: z.string(),
            postalCode: z.string(),
            street: z.string(),
            other: z.string(),
        }),
        billedAt: z.string().datetime(),
        deliveredAt: z.string().datetime(),
        productId: z.number(),
        delivererId: z.number(),
        userId: z.number(),
    }),
})

const updateOrder = z.object({
    body: z.object({
        id: z.number(),
        totalPrice: z.number().optional(),
        deliveryFees: z.number().optional(),
        status: z.enum(['INACTIVE', 'ACTIVE', 'COMPLETED', 'CANCELLED']).optional(),
        transactionReference: z.string().optional(),
        deliveryAddressId: z.string().optional(),
        billedAt: z.string().datetime().optional(),
        deliveredAt: z.string().datetime().optional(),
        productId: z.number().optional(),
        delivererId: z.number().optional(),
        userId: z.number().optional(),
    }),
})

const deleteOrder = z.object({
    params: z.object({
        id: z.string(),
    }),
})

const getOrders = z.object({
    query: z.object({
        userId: z.string().optional(),
        delivererId: z.string().optional(),
    }),
})

type createOrderType = z.infer<typeof createOrder.shape.body>

export { createOrder, updateOrder, getOrders, deleteOrder, type createOrderType }
