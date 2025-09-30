import { invalidIdResponse, ok } from "../helpers"
import { serverError } from "../helpers.js"

export class DeleteTrasnactionController {
    constructor(deleteTransactionUseCase){
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest){
        try{
           const idIsValid = checkIfIdIsValid(httpRequest.params.trasactionId)

           if(!idIsValid){
            return invalidIdResponse()
           }
           const transaction = await this.deleteTransactionUseCase.execute(
            httpRequest.params.transactionId
           )
           
           return ok(transaction)
           
        }catch (error) {
            console.error(error)
            return serverError()
        }
    }
}