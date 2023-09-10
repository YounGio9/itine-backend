import appOrigins from '@/config/origins'
import type { Request, Response, NextFunction } from 'express'

const credentials = (req: Request, res: Response, next: NextFunction): void => {
    if (appOrigins.includes(req.headers.origin as string)) {
        res.header('Access-Control-Allow-Credentials', 'true')
    }

    next()
}

export default credentials
