import type { z } from 'zod'
import type { createCategory } from './category.validation'

type Category = Omit<z.infer<typeof createCategory.shape.body>, 'image' | 'productId'> & {
    id: number
}

export default Category
