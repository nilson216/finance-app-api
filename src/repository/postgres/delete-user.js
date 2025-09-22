
import { PostgresHelper } from "../../db/helper"

export class PostgresDeleteUser {
    async execute(userId) {
        const deletedUser = await PostgresHelper.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [userId]
        )
        return deletedUser[0]
    }
}