import prismaClient from '@utils/prisma'
import type User from './user.interface'
import { type createUserType } from './user.validation'

class UserService {
    private readonly user = prismaClient.user
    /**
     * Create a new user
     */
    public async create(payload: createUserType): Promise<User> {
        try {
            const user = await this.user.create({
                data: {
                    ...payload,
                    role: 'user',
                },
            })

            return user
        } catch (error) {
            throw new Error('Unable to create User')
        }
    }

    public async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.user.findMany()

            return users
        } catch (error) {
            throw new Error('Unable to find Users')
        }
    }

    public async getByRefreshToken(refreshToken: string): Promise<User | null> {
        try {
            const user = await this.user.findUnique({
                where: {
                    refreshToken,
                },
            })

            return user
        } catch (error) {
            throw new Error('Cant find user')
        }
    }

    public async getByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.user.findUnique({ where: { email } })
            return user
        } catch (error) {
            throw new Error('Cant find user')
        }
    }

    public async updateByEmail(email: string, data: Partial<User>): Promise<void> {
        try {
            await this.user.update({
                where: { email },
                data: { ...data },
            })
        } catch (error) {
            throw new Error('Cant create user')
        }
    }
}

export default UserService
