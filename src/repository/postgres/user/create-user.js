import { prisma } from "../../../../prisma/prisma.js";

export class PostgresCreateUserRepository {
    async execute(createUserParams){
        return await prisma.user.create({
            data: {
                id: createUserParams.id,
                email: createUserParams.email,
                first_name: createUserParams.first_name,
                last_name: createUserParams.last_name,
                password: createUserParams.password,
            }
        })
    }
}
