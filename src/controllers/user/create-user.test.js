import {CreateUserController} from "./create-user.js"

describe('Create user Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
          return user
        }
    }
    it('should create an user', async () => {

        const createUserUseCase = new CreateUserUseCaseStub()

        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest= {
            body: {
                first_name: 'Nilson', // If for inserted first_name return status 201 ok
                last_name: 'Neto',
                email: 'nilson@gmail.com',
                password: '1234567'
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        //act
        const httpRequest = {
            body: {
                // if there is no return status 400 error or Bad Request
                last_name: 'Neto',
                email:'nilson@gmail.com',
                password: '1234567'
            },
        }

        const result = await createUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(400)
    })

      it('should return 400 if last_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        //act
        const httpRequest = {
            body: {
                // if there is no return status 400 error or Bad Request
                first_name: 'Nilson',
                email:'nilson@gmail.com',
                password: '1234567'
            },
        }

        const result = await createUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        //act
        const httpRequest = {
            body: {
                // if there is no return status 400 error or Bad Request
                first_name: 'Nilson',
                last_name:'Neto',
                password: '1234567'
            },
        }

        const result = await createUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        //act
        const httpRequest = {
            body: {
                // if there is no return status 400 error or Bad Request
                first_name: 'Nilson',
                last_name: 'Neto',
                email:'nilson@gmail.com'         
            },
        }

        const result = await createUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(400)
    })


     it('should return 400 if password is less than  characters ', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        //act
        const httpRequest = {
            body: {
               
                first_name: 'Nilson',
                last_name: 'Neto',
                email:'nilson@gmail.com',
                password: '12345'        
            },
        }

        const result = await createUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should call CreateUserUseCase with correct params', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
              
                first_name: 'Nilson',
                last_name: 'Neto',
                email:'nilson@gmail.com',
                password: '1234567'        
            },
        }
        const executeSpy = jest.spy0n(createUserUseCase, 'execute')
        await createUserController.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        
    })
})