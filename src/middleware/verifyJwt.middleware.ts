import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import logger from '@utils/logger.util'

const verifyJwt = (
    req: Request & { user?: string },
    res: Response,
    next: NextFunction,
): Response | void => {
    const token = req.headers.authorization?.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    logger.info(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,

        (err, decoded: any) => {
            if (err != null) {
                return res.sendStatus(403)
            }
            req.user = decoded.email

            next()
        },
    )
}

export default verifyJwt
