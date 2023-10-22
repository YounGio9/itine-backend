import type { z } from 'zod'
import type Deliverer from '@resources/deliverer/deliverer.interface'
import type Product from '@resources/product/product.interface'
import type User from '@resources/user/user.interface'
import type { createOrder } from './order.validation'

type Order = Omit<z.infer<typeof createOrder.shape.body>, 'billedAt' | 'deliveredAt'> & {
    id: number
    deliverer?: Deliverer
    Product?: Product
    User?: User
    billedAt: Date
    deliveredAt: Date
}

export default Order
