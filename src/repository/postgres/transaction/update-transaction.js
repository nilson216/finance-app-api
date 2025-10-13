import { prisma } from '../../../../prisma/prisma.js';

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        const existingTransaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
        });

        if (!existingTransaction) {
            throw new Error(`Transaction with id ${transactionId} not found`);
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id: transactionId },
            data: updateTransactionParams,
        });

        return updatedTransaction;
    }
}
