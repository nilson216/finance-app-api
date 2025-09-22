import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository, PostgresUpdateUserRepository} from '../repository/postgres/index.js'
import { EmailAlreadyInUseError} from '../errors/user.js'

export class UpdateUserCase {
    async execute(userId, updateUserParams){
        
         if (updateUserParams.email) {
            const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository()
            
            const userWithProvidedEmail = await postgresGetUserByEmailRepository.execute(
            updateUserParams.email
            )
            // se repetir parece
            if (userWithProvidedEmail && userWithProvidedEmail.id != userId){
            throw new EmailAlreadyInUseError(createdUserParams.email)
             }
         }
         const user = {
            ...updateUserParams
         }
       
if ( updateUserParams.password){
    const hashedPassword = await bcrypt.hash(updateUserParams.password, 10)

    user.params = hashedPassword
}
    

        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user
        )

        return updatedUser;
    }
}