import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, postgresCreateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.postgresCreateUserRepository = postgresCreateUserRepository;
    }
    async execute(createdUserParams) {
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(
                createdUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createdUserParams.email);
        }

        const userId = uuidv4();

        const hashedPassword = await bcrypt.hash(
            createdUserParams.password,
            10,
        );

        const user = {
            ...createdUserParams,
            id: userId,
            password: hashedPassword,
        };

        return await this.postgresCreateUserRepository.execute(user);
    }
}
