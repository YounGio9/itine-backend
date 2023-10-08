import type { z } from 'zod'
import type { createCartItem } from './cartItem.validation'
import Product from '@resources/product/product.interface'

type CartItem = z.infer<typeof createCartItem.shape.body> & {
    id: number
    product: Product
}

export default CartItem
