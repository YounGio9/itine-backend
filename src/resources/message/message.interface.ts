import type { z } from 'zod'
import type { createMessage } from './message.validation'

type Message = z.infer<typeof createMessage.shape.body> & {
    id: number
}

interface Chat {
    user: string
    messages: Message[]
}

export type { Message, Chat }
