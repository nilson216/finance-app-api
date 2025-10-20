import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction'

describe('CreateTransactionController', () => {
  class CreateTransactionUseCaseStub {
    async execute(transaction) {
      return {
        ...transaction,
        id: faker.string.uuid(),
      }
    }
  }

  const makeSut = () => {
    const createTransactionUseCase = new CreateTransactionUseCaseStub()
    const sut = new CreateTransactionController(createTransactionUseCase)
    return { sut, createTransactionUseCase }
  }

  const baseHttpRequest = {
    body: {
      user_id: faker.string.uuid(),
      name: faker.commerce.productName(),
      date: faker.date.anytime().toISOString(),
      type: 'EXPENSE',
      amount: Number(faker.finance.amount()),
    },
  }

  it('should return 201 when creating transaction successfully', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(baseHttpRequest)
    expect(response.statusCode).toBe(201)
  })

  it('should return 400 when missing required fields', async () => {
    const { sut } = makeSut()

    for (const field of ['user_id', 'name', 'date', 'type', 'amount']) {
      const httpRequest = {
        body: { ...baseHttpRequest.body, [field]: undefined },
      }
      const response = await sut.execute(httpRequest)
      expect(response.statusCode).toBe(400)
    }
  })

  it('should return 500 if CreateTransactionUseCase throws', async () => {
    const { sut, createTransactionUseCase } = makeSut()
    jest.spyOn(createTransactionUseCase, 'execute').mockRejectedValueOnce(new Error())
    const response = await sut.execute(baseHttpRequest)
    expect(response.statusCode).toBe(500)
  })

  it('should call CreateTransactionUseCase with correct params', async () => {
    const { sut, createTransactionUseCase } = makeSut()
    const executeSpy = jest.spyOn(createTransactionUseCase, 'execute')
    await sut.execute(baseHttpRequest)
    expect(executeSpy).toHaveBeenCalledWith(baseHttpRequest.body)
  })
})
