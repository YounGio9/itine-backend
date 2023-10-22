import type { z } from 'zod'
import type { createOrderItem } from './orderItem.validation'

type OrderItem = z.infer<typeof createOrderItem.shape.body> & {
    id: number
}

export default OrderItem
