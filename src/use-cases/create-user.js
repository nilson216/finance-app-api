import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repository/postgres/create-user.js';

export class CreateUserUseCase {
    async execute(createdUserParams){
        // TODO: Verificar se o email ja esta em uso
        //gerar ID do usuario
        const userId = uuidv4();
        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createdUserParams.password, 10);
        // inserir o usuario no banco
        const user = {
            ...createdUserParams,
            id : userId,
            password: hashedPassword, 
        }

        // chamar o repositorio
        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        return await postgresCreateUserRepository.createUser(user);
    }
}