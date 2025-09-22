import { UpdateUserCase } from '../use-cases/update-user.js'
import { invalidPasswordResponse, emailIsAlreadyInUseResponse, checkIfEmailIsValid,ok,checkIfIdIsValid,checkIfPasswordIsValid, badRequest, created, serverError,} from './helpers/index.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {

            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

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
                const passwordIsValid = checkIfPasswordIsValid(params.password)

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
