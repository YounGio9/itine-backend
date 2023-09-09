import { z } from 'zod'

const createUser = z.object({
    body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(8, 'Password should have at least 8 characters.')
            .regex(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]/,
                'Password should have alphanumeric characters and at least one special character.',
            ),
        country: z.string(),
        town: z.string(),
        phoneNumber: z.number().min(6, 'Please enter a valid phone Number'),
    }),
})

const updateUser = z.object({})

type createUserType = z.infer<typeof createUser.shape.body>

export { createUser, updateUser, type createUserType }
