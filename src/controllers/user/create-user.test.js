import { EmailAlreadyInUseError } from "../../errors/user.js"
import { CreateUserController } from "./create-user.js"
import { faker } from '@faker-js/faker'

describe('CreateUserController', () => {
  class CreateUserUseCaseStub {
    execute(user) {
      return user
    }
  }

  it('should create a user', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase)

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    }

    const result = await createUserController.execute(httpRequest)

    expect(result.statusCode).toBe(201)
    expect(result.body).toMatchObject(httpRequest.body)
  })

  it('should return 400 if first_name is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase)

    const httpRequest = {
      body: {
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    }

    const result = await createUserController.execute(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  it('should return 400 if last_name is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase)

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    }

    const result = await createUserController.execute(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  it('should return 400 if email is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase)

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: faker.internet.password(),
      },
    }

    const result = await createUserController.execute(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  it('should return 400 if password is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase)

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
      },
    }

    const result = await createUserController.execute(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  it('should return 400 if password is less than 8 characters', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase)

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
      },
    }

    const result = await createUserController.execute(httpRequest)
    expect(result.statusCode).toBe(400)
  })

  it('should call CreateUserUseCase with correct params', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase)

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    }

    const executeSpy = jest.spyOn(createUserUseCase, 'execute')
    await createUserController.execute(httpRequest)

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 500 if CreateUserUseCase throws', async () => {

  //arrange
   const createUserUseCase = new CreateUserUseCaseStub()
   const createUserController = new CreateUserController(createUserUseCase)

   const httpRequest = {
     body: {
       first_name: faker.person.firstName(),
       last_name: faker.person.lastName(),
       email: faker.internet.email(),
       password: faker.internet.password({
        length: 7,
       }),
     },
   }
   jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
    throw new Error()
    })
  //act
  const result = await createUserController.execute(httpRequest)
  // assert
  expect(result.statusCode).toBe(500)
  })

  it('should return 500 if CreateUserUseCase throws EmailIsAlreadyuInUseError', async () => {
    //arrange
      const createUserUseCase = new CreateUserUseCaseStub()
      const createUserController = new CreateUserController(createUserUseCase)
      
      const httpRequest = { 
        body: {
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      }
     
      jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
       throw new EmailAlreadyInUseError()
       })
     //act
     const result = await createUserController.execute(httpRequest)
     // assert
     expect(result.statusCode).toBe(400)
     })
})
