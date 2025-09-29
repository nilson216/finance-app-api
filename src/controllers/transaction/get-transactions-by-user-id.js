import { UserNotFoundError } from "../../errors/user.js";
import { ok, serverError } from "../helpers/http.js";
import { userNotFoundResponse } from "../helpers/user.js";
import { checkIfIdIsValid, invalidIdResponse, requiredFieldIsMissingResponse } from "../helpers/validation.js";



export class GetTransactionsByUserIdController {
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