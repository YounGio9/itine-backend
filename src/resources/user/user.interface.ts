import type { z } from 'zod'
import type { createUser } from './user.validation'

type User = z.infer<typeof createUser.shape.body> & {
    id: number
    role: 'admin' | 'user'
    refreshToken: string | null
}

export default User
