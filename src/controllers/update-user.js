import { UpdateUserCase } from '../use-cases/update-user.js'
import { checkIfEmailIsValid, invalidIdResponse } from './helpers/user.js'
import { badRequest, serverError, ok } from './helpers/http.js'
import validator from 'validator';

export class UpdateUserController {
    async execute(httpRequest) {
        try {

            const userId = httpRequest.params.userId
            const isIdValid = validator.isUUID(userId)
            if (!isIdValid){
                return invalidIdResponse()
            }
            const params = httpRequest.body;
            

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                });
            }
            if (params.password) {
                const passwordIsValid = checkIfPassswordIsValid(params.password)

                if (!passwordIsValid) {
                   return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return emailIsAlreadyInUseResponse(params.email)
                }
            }
            const updateUserUseCase = new UpdateUserCase();
            const updatedUser = await updateUserUseCase.execute(userId,params);
            return ok(updatedUser)
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
