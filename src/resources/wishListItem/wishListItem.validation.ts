import { z } from 'zod'

const createWishListItem = z.object({
    body: z.object({
        productId: z.number(),
        userId: z.number(),
    }),
})

const getByUserId = z.object({
    params: z.object({
        id: z.string(),
    }),
})

const deleteWishListItem = z.object({
    params: z.object({
        id: z.string(),
    }),
})

type createWishListItemType = z.infer<typeof createWishListItem.shape.body>

export { createWishListItem, deleteWishListItem, getByUserId, type createWishListItemType }
