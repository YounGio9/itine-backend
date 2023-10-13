import type { z } from 'zod'
import type { createWishListItem } from './wishListItem.validation'

type WishListItem = z.infer<typeof createWishListItem.shape.body> & {
    id: number
}

export default WishListItem
