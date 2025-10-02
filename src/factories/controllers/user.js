import { PostgresGetUserByIdRepository, PostgresCreateUserRepository, PostgresGetUserByEmailRepository, PostgresUpdateUserRepository, PostgresDeleteUserRepository, PostgresGetUserBalanceRepository} from "../../repository/postgres/index.js"
import { GetUserByIdUseCase, CreateUserUseCase, UpdateUserCase, DeleteUserUseCase, GetUserBalanceUseCase} from "../../use-cases/index.js"
import { GetUserByIdController,CreateUserController, UpdateUserController, DeleteUserController, GetUserBalanceController } from "../../controllers/index.js"


export const makeGetUserByIdController = () => {
    const getUserByRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
    
}

export const makeCreateUserController = () => {

    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserRepository = new PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(getUserByEmailRepository,createUserRepository);

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController

}

export const makeUpdateUserController = () => {

 const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const updateUserRepository = new PostgresUpdateUserRepository();

  const updateUserUseCase = new UpdateUserCase(getUserByEmailRepository, updateUserRepository);

  const updateUserController = new UpdateUserController(updateUserUseCase);
    return updateUserController
}

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository()

  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

  const deleteUserController = new DeleteUserController(deleteUserUseCase)

  return deleteUserController
}

export const makeGetUserBalanceController = () => {

  const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
  const getUserByIdRepository = new PostgresGetUserByIdRepository()

  const getUserBalanceUseCase = new GetUserBalanceUseCase(getUserBalanceRepository, getUserByIdRepository)

  const getUserBalanceController = new GetUserBalanceController(getUserBalanceUseCase)

  return getUserBalanceController

}