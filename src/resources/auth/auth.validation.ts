import { z } from 'zod'

const login = z.object({
    body: z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(8, 'Password should have at least 8 characters.')
            .regex(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]/,
                'Password should have alphanumeric characters and at least one special character.',
            ),
    }),
})

export default login
