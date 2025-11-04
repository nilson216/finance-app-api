import { EmailAlreadyInUseError } from '../../errors/index.js';

export class CreateUserUseCase {
    //injection dependencies: The use case create to the dependencies, it receives them promptly, which makes it easier to test and exchange implementations.
    constructor(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
        tokensGeneratorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository; //acess db and found a user by email
        this.createUserRepository = createUserRepository; //access db and create a user
        this.passwordHasherAdapter = passwordHasherAdapter; //hash user password
        this.idGeneratorAdapter = idGeneratorAdapter; //generate user id
        this.tokensGeneratorAdapter = tokensGeneratorAdapter; //generate user tokens
    }

    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userId = this.idGeneratorAdapter.execute();

        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password,
        );

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        const createdUser = await this.createUserRepository.execute(user);

        return {
            ...createdUser,
            tokens: this.tokensGeneratorAdapter.execute(userId),
        };
    }
}
