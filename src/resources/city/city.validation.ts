import { z } from 'zod'

const createCity = z.object({
    body: z.object({
        name: z.string(),
    }),
})

const updateCity = z.object({
    body: z.object({
        name: z.string().optional(),
        id: z.number(),
    }),
})

const deleteCity = z.object({
    params: z.object({
        id: z.string(),
    }),
})

type createCityType = z.infer<typeof createCity.shape.body>

export { createCity, deleteCity, updateCity, type createCityType }
