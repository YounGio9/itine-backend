import { z } from 'zod'

const createDeliverer = z.object({
    body: z.object({
        lastName: z.string(),
        firstName: z.string(),
        dateOfBirth: z.string().datetime(),
        country: z.string(),
        town: z.string(),
        email: z.string().email('Please enter a valid email address'),
        phoneNumber: z.string(),
        postalCode: z.string(),
        maritalStatus: z.enum(['single', 'married']),
    }),
})

const updateDelivererStatus = z.object({
    body: z.object({
        id: z.number(),
        active: z.boolean(),
    }),
})

const updateDeliverer = z.object({})

type createDelivererType = z.infer<typeof createDeliverer.shape.body>
type updateDelivererStatusType = z.infer<typeof updateDelivererStatus.shape.body>

export {
    createDeliverer,
    updateDeliverer,
    updateDelivererStatus,
    type createDelivererType,
    type updateDelivererStatusType,
}
