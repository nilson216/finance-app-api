import { UserNotFoundError } from "../../errors/user"
import { v4 as uuidv4 } from 'uuid';

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository){
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(createTransactionParams){
      // Todo: validate if user exists
      const userId = createTransactionParams.user_id

      const user = await this.getUserByIdRepository.execute(userId)

      if(!user){
        throw new UserNotFoundError
      }

      const transactionId = uuidv4()
      
      const transaction = await this.createTransactionRepository.execute({
        ...createTransactionParams,
        id: transactionId
      })

      return transaction
   
    }
}