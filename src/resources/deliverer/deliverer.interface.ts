import type { z } from 'zod'
import type { createDeliverer } from './deliverer.validation'

type Deliverer = Omit<z.infer<typeof createDeliverer.shape.body>, 'dateOfBirth'> & {
    id: number
    dateOfBirth: Date
    status: 'unset' | 'accepted' | 'rejected'
    password: string | null
}

export default Deliverer
