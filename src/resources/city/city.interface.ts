import type { z } from 'zod'
import type { createCity } from './city.validation'

type City = z.infer<typeof createCity.shape.body> & {
    id: number
}

export default City
