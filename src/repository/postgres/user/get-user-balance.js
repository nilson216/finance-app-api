import { Prisma } from '@prisma/client';
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

     
        const earnings = totalEarnings || new Prisma.Decimal(0);
        const expenses = totalExpenses || new Prisma.Decimal(0);
        const investments = totalInvestments || new Prisma.Decimal(0);

        const balance = earnings.sub(expenses).sub(investments);

        return {
            earnings: totalEarnings,
            expenses: totalExpenses,
            investments: totalInvestments,
            balance,
        }
    }
}
