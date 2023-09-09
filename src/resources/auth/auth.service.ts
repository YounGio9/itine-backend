import type User from '@resources/user/user.interface'
import UserService from '@resources/user/user.service'
import { hashPassword, isValidPassword } from '@utils/bcrypt.util'
import HttpException from '@utils/exceptions/http.exception'
import prismaClient from '@utils/prisma'
import jwt from 'jsonwebtoken'

class AuthService {
    private readonly User = prismaClient.user

    public async register(payload: User): Promise<User> {
        const retrievedUser = await this.User.findUnique({ where: { email: payload.email } })
        if (retrievedUser != null) {
            throw new HttpException(400, 'User already exists')
        }

        const hashedPassword = await hashPassword(payload.password)

        try {
            const user = await new UserService().create({ ...payload, password: hashedPassword })
            return user
        } catch (error) {
            throw new Error('Cannot register user')
        }
    }

    public async login({
        email,
        password,
    }: {
        email: string
        password: string
    }): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            const retrievedUser = await this.User.findUnique({ where: { email } })

            if (retrievedUser == null) {
                throw new HttpException(401, "User doesn't exist")
            }

            console.log(password, retrievedUser.password)

            if (!(await isValidPassword(password, retrievedUser.password))) {
                throw new HttpException(403, 'Invalid password')
            }

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

            return { accessToken, refreshToken }
        } catch (err) {
            throw new HttpException(400, `User login request failed`)
        }
    }
}

export default AuthService
