import type { z } from 'zod'
import type { createColor } from './color.validation'

type Color = z.infer<typeof createColor.shape.body> & {
    id: number
}

export default Color
