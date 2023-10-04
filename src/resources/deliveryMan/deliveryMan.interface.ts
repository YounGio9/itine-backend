import type { z } from 'zod'
import type { createDeliveryMan } from './deliveryMan.validation'

type DeliveryMan = Omit<z.infer<typeof createDeliveryMan.shape.body>, 'dateOfBirth'> & {
    id: number
    dateOfBirth: Date
    status: 'unset' | 'accepted' | 'rejected'
}

export default DeliveryMan
