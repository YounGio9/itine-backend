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
}

export default UserService
