import { prisma } from '../../../../prisma/prisma.js'
export class PostgresDeleteUserRepository {
    async execute(userId) {
       return await prisma.user.delete({
        where: {
            id: userId
        },
       })
    }
}
