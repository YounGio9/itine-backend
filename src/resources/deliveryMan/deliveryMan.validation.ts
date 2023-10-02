import { z } from 'zod'

const createDeliveryMan = z.object({
    body: z.object({
        lastName: z.string().email('Please enter a valid email address'),
        firstName: z.string(),
        dateOfBirth: z.string().datetime(),
        country: z.string(),
        town: z.string(),
        email: z.string(),
        body: z.string(),
        phoneNumber: z.string(),
        postalCode: z.string(),
        maritalStatus: z.enum(['single', 'married']),
    }),
})

const updateDeliveryManStatus = z.object({
    body: z.object({
        id: z.number(),
        active: z.boolean(),
    }),
})

const updateDeliveryMan = z.object({})

type createDeliveryManType = z.infer<typeof createDeliveryMan.shape.body>

export { createDeliveryMan, updateDeliveryMan, updateDeliveryManStatus, type createDeliveryManType }
