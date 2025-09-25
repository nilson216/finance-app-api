import validator from 'validator';
import {
    badRequest,
    serverError,
    invalidIdResponse,
    checkIfIdIsValid,
    created,
} from '../helpers/index.js';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].toString().trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: 'Amount must be greater than zero',
                });
            }
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            );

            if (!amountIsValid) {
                return badRequest({
                    message: 'Amount must be a valid currency format',
                });
            }
            const type = params.type.trim().toUpperCase();

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(
                type,
            );
            if (!typeIsValid) {
                return badRequest({
                    message:
                        'Type must be one of the following: EARNING, EXPENSE, INVESTIMENT',
                });
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });
            return created(transaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
