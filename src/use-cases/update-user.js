import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository} from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError} from '../errors/user.js'
import { PostgresUpdateUserRepository} from '../repository/postgres/update-user.js'

export class UpdateUserCase {
    async execute(userId, updateUserParams){
        // se o email estiver sendo atualizado, verificar se ele ja esta em uso
         if (updateUserParams.email) {
            const postgresGetUserByEmailRepository = 
            new PostgresGetUserByEmailRepository()
            
            const userWithProvidedEmail = await GetUserByEmailRepository.execute(
            createdUserParams.email
            )
            // se repetir parece
            if (userWithProvidedEmail){
            throw new EmailAlreadyInUseError(createdUserParams.email)
             }
         }
         const user = {
            ...updateUserParams
         }
        // se a senha estiver sendo atualizada, criptografa-la
if ( updateUserParams.password){
    const hashedPassword = await bcrypt.hash(updateUserParams.password, 10)

    user.params = hashedPassword
}
        //chamar o repository para atualizar o usuario

        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user
        )

        return updatedUser;
    }
}