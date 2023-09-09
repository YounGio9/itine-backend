import HttpException from '@utils/exceptions/http.exception'
import prismaClient from '@utils/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthService {
    private readonly User = prismaClient.user

    public async isValidPassword(pwd: string, foundUserPwd: string): Promise<boolean> {
        const match = await bcrypt.compare(pwd, foundUserPwd)
        return match
    }

    public async login({ email, pwd }: { email: string; pwd: string }): Promise<string> {
        const retrievedUser = await this.User.findUnique({ where: { email } })

        if (retrievedUser == null) {
            throw new HttpException(401, "User doesn't exist")
        }

        if (await this.isValidPassword(pwd, retrievedUser.password)) {
            const accessToken = jwt.sign(
                { email: retrievedUser.email },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: '30s' },
            )

            const refreshToken = jwt.sign(
                { email: retrievedUser.email },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: '1d' },
            )

            await this.User.update({
                where: {
                    email,
                },

                data: {
                    refreshToken,
                },
            })

            return accessToken
        }

        throw new HttpException(400, 'User login request failed')
    }
}

export default AuthService
