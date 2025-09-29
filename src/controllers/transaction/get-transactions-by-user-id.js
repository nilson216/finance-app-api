import { ok, requiredFieldIsMissingResponse, serverError, userNotFoundResponse } from "../helpers"
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error.js"

export class GetTransactionsByUserId {
    constructor(getTransactionsByUserIdUseCase){
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try{
            const userId = httpRequest.query.userId
// verificar se o userId foi passado como parametro
if (!userId) {
    return requiredFieldIsMissingResponse('userId')
}
    // verificar se o UserID e um Id valido
const userIdIsValid = checkIfIdIsValid(userId);

if (!userIdIsValid) {
    return invalidIdResponse();
}

// chamar o use case
const transactions = await this.getTransactionsByUserIdUseCase.execute({userId})
// retornar a resposta com status 200 e o body com as transactions
return ok(transactions)
        }
        catch(error){
            if(error instanceof UserNotFoundError){
                return userNotFoundResponse()
            }
           console.error(error)
              return serverError()
        }
    }
}