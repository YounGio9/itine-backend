import { z } from 'zod'

const createMessage = z.object({
    body: z.object({
        senderMail: z.string().email('Please enter a valid email address'),
        senderName: z.string(),
        subject: z.string(),
        body: z.string(),
    }),
})

const replyMessage = z.object({
    body: z.object({
        email: z.string().email('Please enter a valid email address'),
        subject: z.string(),
        body: z.string(),
    }),
})

const updateMessage = z.object({})

type createMessageType = z.infer<typeof createMessage.shape.body>

export { createMessage, replyMessage, updateMessage, type createMessageType }
