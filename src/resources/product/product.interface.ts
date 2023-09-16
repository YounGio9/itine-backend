import type { z } from 'zod'
import type { createProduct } from './product.validation'

type Product = z.infer<typeof createProduct.shape.body> & {
    id: number
}

export default Product
