import { UpdateUserCase } from '../use-cases/update-user.js';
import { badRequest, serverError, ok } from './helpers.js';
import validator from 'validator';

export class UpdateUserController {
    async execute(httpRequest) {
        try {

            const userId = httpRequest.params.userId
            const isIdValid = validator.isUUID(userId)
            if (!isIdValid){
                return badRequest ({
                    message: 'The provided id is not valid.'
                })
            }
            const updateUserParams = httpRequest.body;
            

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                });
            }
            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6;

                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'Password must be at least 6 characters',
                    });
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email);

                if (!emailIsValid) {
                    return badRequest({
                        message: 'Invalid e-mail. Please provide a valid one',
                    });
                }
            }
            const updateUserUseCase = new UpdateUserCase();
            const updatedUser = await updateUserUseCase.execute(userId,updateUserParams);
            return ok(updatedUser)
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
