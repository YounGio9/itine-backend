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

const updateDeliverer = z.object({
    body: z.object({
        id: z.number(),
        lastName: z.string().optional(),
        firstName: z.string().optional(),
        dateOfBirth: z.string().datetime().optional(),
        country: z.string().optional(),
        town: z.string().optional(),
        email: z.string().email('Please enter a valid email address').optional(),
        phoneNumber: z.string().optional(),
        postalCode: z.string().optional(),
        maritalStatus: z.enum(['single', 'married']).optional(),
        password: z
            .string()
            .min(8, 'Password should have at least 8 characters.')
            .regex(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]/,
                'Password should have alphanumeric characters and at least one special character.',
            )
            .optional(),
    }),
})

type createDelivererType = z.infer<typeof createDeliverer.shape.body>
type updateDelivererStatusType = z.infer<typeof updateDelivererStatus.shape.body>

export {
    createDeliverer,
    updateDeliverer,
    updateDelivererStatus,
    type createDelivererType,
    type updateDelivererStatusType,
}
