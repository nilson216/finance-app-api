import { prisma } from '../../../../prisma/prisma.js';

export class PostgresGetTransactionsByUserIdRepository {
    async execute(userId) {
        const transactions = await prisma.transaction.findMany({
            where: { user_id: userId },
        });

        return transactions;
    }
}
