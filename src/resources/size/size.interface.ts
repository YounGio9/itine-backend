import type { z } from 'zod'
import type { createSize } from './size.validation'

type Size = z.infer<typeof createSize.shape.body> & {
    id: number
}

export default Size
