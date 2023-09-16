import type { z } from 'zod'
import type { createCategory } from './category.validation'

type Category = z.infer<typeof createCategory.shape.body> & {
    id: number
}

export default Category
