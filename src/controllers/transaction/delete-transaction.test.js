import { faker } from '@faker-js/faker'
import { DeleteTransactionController } from './delete-transaction.js'

describe('DeleteTransactionController', () => {
    class DeleteTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                date: faker.date.anytime().toISOString(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
            }
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub()
        const sut = new DeleteTransactionController(deleteTransactionUseCase)
        return { sut, deleteTransactionUseCase }
    }

  it('should return 200 if transaction is deleted', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({
        params: { transactionId: faker.string.uuid() },
    })
    expect(result.statusCode).toBe(200)
  })

  it('should return 404 when transaction is not found', async () => {
    // arrange
    const { sut, deleteTransactionUseCase } = makeSut()
    jest.spyOn(deleteTransactionUseCase, 'execute').mockResolvedValueOnce(null)
    
    // act
    const result = await sut.execute({
        params: { transactionId: faker.string.uuid() },
    })
    
    // assert
    expect(result.statusCode).toBe(404)
  })
  it('should return 500 when DeleteTransactionUseCase throws', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut()
        
            jest.spyOn(deleteTransactionUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        // act
        const response = await sut.execute({
            params: {
                transactionId: faker.string.uuid(),
                user_id: faker.string.uuid(),
            },
        })

        // assert
        expect(response.statusCode).toBe(500)
    })
    it('should return 500 when DeleteTransactionUseCase throws', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut()
        
            jest.spyOn(deleteTransactionUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        // act
        const response = await sut.execute({
            params: {
                transactionId: faker.string.uuid(),
                user_id: faker.string.uuid(),
            },
        })

        // assert
        expect(response.statusCode).toBe(500)
    })
})
