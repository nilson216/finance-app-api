import { UserNotFoundError } from '../../errors/index.js';

export class CreateTransactionUseCase {
    constructor(
        createTransactionRepository,
        getUserByIdRepository,
        idGeneratorAdapter,
    ) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id;

        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const transactionId = this.idGeneratorAdapter.execute();

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        });

        return transaction;
    }
}
