import type { z } from 'zod'
import type { createMessage } from './message.validation'

type Message = z.infer<typeof createMessage.shape.body> & {
    id: number
}

export default Message
