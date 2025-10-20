import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js'
import { faker } from '@faker-js/faker'

describe('Get Transaction By user ID COntrollers', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return ({
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                amount: faker.number.int(),
                type: 'EXPENSE',
                description: faker.lorem.sentence(),
                date: new Date().toISOString(),
            })
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(getUserByIdUseCase)
        return { sut, getUserByIdUseCase }
    }

    it('should return 200 when finding transaction by user id sucessfully', async () => {
        const { sut } = makeSut()
        const response = await sut.execute({
            query: { userId: faker.string.uuid() },
        })
        expect(response.statusCode).toBe(200)
    })

  })
