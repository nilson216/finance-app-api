import { prisma } from '../../../../prisma/prisma.js';

export class PostgresUpdateUserRepository {
    async execute(userId, updateParams) {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateParams, 
        });

        return updatedUser;
    }
}
