import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../errors/user.js';

export class UpdateUserCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email,
                );
            // se repetir parece
            if (userWithProvidedEmail && userWithProvidedEmail.id != userId) {
                throw new EmailAlreadyInUseError(createdUserParams.email);
            }
        }
        const user = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );

            user.params = hashedPassword;
        }

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
