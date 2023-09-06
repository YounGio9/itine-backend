import type { Request, Response, NextFunction } from 'express'
import { type ZodSchema } from 'zod'

const zodValidator =
    (schema: ZodSchema): any =>
    (req: Request, res: Response, next: NextFunction): any => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        })

        if (result.success) {
            next()
            return
        }
        // eslint-disable-next-line consistent-return
        return res.status(500).json({
            success: result.success,
            message: result.error,
        })
    }

export default zodValidator
