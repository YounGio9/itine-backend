import type { z } from 'zod'
import type { createDeliveryMan } from './deliveryMan.validation'

type DeliveryMan = z.infer<typeof createDeliveryMan.shape.body> & {
    id: number
}

export default DeliveryMan
