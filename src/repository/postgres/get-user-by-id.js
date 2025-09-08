import { PostgresHelper } from "../../db/helper";

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM users WHERE id = $i',
            [userId]
        )

        return user[0]
    }
}