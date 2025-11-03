import { EmailAlreadyInUseError } from '../../errors/index.js';
import { createUserSchema } from '../../schemas/user.js';
import { badRequest, created, serverError } from '../helpers/index.js';
import { ZodError } from 'zod';

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createUserSchema.parseAsync(params);

            const createdUser = await this.createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            if (error instanceof ZodError) {
                const message =
                    error.errors?.[0]?.message || 'Validation error';
                return badRequest({ message });
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.error(error);
            return serverError();
        }
    }
}
