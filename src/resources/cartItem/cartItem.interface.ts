import type { z } from 'zod'
import type Product from '@resources/product/product.interface'
import type { createCartItem } from './cartItem.validation'

type CartItem = z.infer<typeof createCartItem.shape.body> & {
    id: number
    product: Product
}

export default CartItem
