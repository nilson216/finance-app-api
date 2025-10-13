import { prisma } from '../../../../prisma/prisma.js';

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        
        const { _sum: { amount: totalExpenses } = { amount: 0 } } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: { amount: true },
        });

       
        const { _sum: { amount: totalEarnings } = { amount: 0 } } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: { amount: true },
        });

       
        const { _sum: { amount: totalInvestments } = { amount: 0 } } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENT',
            },
            _sum: { amount: true },
        });

     
        const balance = (totalEarnings || 0) - (totalExpenses || 0) - (totalInvestments || 0);

        return balance;
    }
}
