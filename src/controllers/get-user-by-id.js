
import { PostgresGetUserByIdRepository } from "../repository/postgres/user/get-user-by-id.js"
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js"
import { invalidPasswordResponse, invalidIdResponse, emailIsAlreadyInUseResponse, ok,checkIfIdIsValid, userNotFoundResponse, checkIfEmailIsValid, checkIfPasswordIsValid, badRequest, created, serverError,} from './helpers/index.js'


export class GetUserByIdController {
  constructor(getUserByIdUseCase){
    this.getUserByIdUseCase = getUserByIdUseCase
  }
    async execute(httpRequest) {
      try{

        const isIdValid = checkIfIdIsValid(httpRequest.params.userId)
        if(!isIdValid){
          return invalidIdResponse()
        }
       
        const user = await this.getUserByIdUseCase.execute(
            httpRequest.params.userId
        )

        if(!user){
          return userNotFoundResponse()
        }

        return ok(user)
      } catch (error){
        console.error(error)
        return serverError()
      }
    }
}