import { PostgresHelper } from "../../../db/helper.js"

export class PostgresDeleteTransactionRepository {
    async execute(transactionId) {
        const transactions = await PostgresHelper.query(
            'DELETE * FROM transactions WHERE id = $1',
            [transactionId]
        );
        return transactions[0];
    }
}