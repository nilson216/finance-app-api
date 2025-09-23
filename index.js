import "dotenv/config.js";
import express from 'express';
import { CreateUserController, GetUserByIdController, UpdateUserController, DeleteUserController} from "./src/controllers/index.js";
import { PostgresGetUserByIdRepository } from "./src/repository/postgres/get-user-by-id.js";
import { GetUserByIdUseCase } from "./src/use-cases/get-user-by-id.js";
import { PostgresCreateUserRepository } from "./src/repository/postgres/create-user.js";
import { CreateUserUseCase } from "./src/use-cases/create-user.js";
import { PostgresGetUserByEmailRepository } from "./src/repository/postgres/get-user-by-email.js";
import { PostgresUpdateUserRepository } from "./src/repository/postgres/update-user.js";
import { UpdateUserCase } from "./src/use-cases/update-user.js";

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {

  const getUserByIdRepository = new PostgresGetUserByIdRepository()

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

  const { statusCode, body} = await getUserByIdController.execute(request)

  response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {

  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const createUserRepository = new PostgresCreateUserRepository();

  const createUserUseCase = new CreateUserUseCase(getUserByEmailRepository,createUserRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  const {statusCode, body} = await createUserController.execute(request);

  response.status(statusCode).json(body);

});

app.patch('/api/users/:userId', async (request, response) => {

  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const updateUserRepository = new PostgresUpdateUserRepository();

  const updateUserUseCase = new UpdateUserCase(getUserByEmailRepository, updateUserRepository);

  const updateUserController = new UpdateUserController(updateUserUseCase);

  const {statusCode, body} = await updateUserController.execute(request)

  response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserController = new DeleteUserController()

  const {statusCode, body} = await deleteUserController.execute(request)
  
  response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
