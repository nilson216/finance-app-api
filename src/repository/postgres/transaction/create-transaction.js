import { prisma } from '../../../../prisma/prisma.js';

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const transaction = await prisma.transaction.create({
            data: createTransactionParams,
        });

        return transaction;
    }
}
