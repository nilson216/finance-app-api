import { TransactionNotFoundError } from '../../errors/index.js'
import { UpdateTransactionController } from './update-transaction.js'
import { faker } from '@faker-js/faker'

describe('Update Transaction Controller', () => {
  const transaction = {
    user_id: faker.string.uuid(),
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    date: faker.date.anytime().toISOString(),
    type: 'EXPENSE',
    amount: Number(faker.finance.amount()),
  }

  class UpdateTransactionUseCaseStub {
    async execute() {
      return transaction
    }
  }

  const makeSut = () => {
    const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
    const sut = new UpdateTransactionController(updateTransactionUseCase)
    return { sut, updateTransactionUseCase }
  }

  const baseHttpRequest = {
    params: { transactionId: faker.string.uuid() },
    body: {
      name: faker.commerce.productName(),
      date: faker.date.anytime().toISOString(),
      type: 'EXPENSE',
      amount: Number(faker.finance.amount()),
    },
  }

  it('should return 200 when updating a transaction successfully', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(baseHttpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(transaction)
  })

  it('should return 400 when transaction id is invalid', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({ ...baseHttpRequest, params: { transactionId: 'invalid_id' } })
    expect(response.statusCode).toBe(400)
  })

  it('should return 400 when amount is invalid', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({
      ...baseHttpRequest,
      body: { ...baseHttpRequest.body, amount: 'invalid_amount' },
    })
    expect(response.statusCode).toBe(400)
  })

  it('should return 400 when type is invalid', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({
      ...baseHttpRequest,
      body: { ...baseHttpRequest.body, type: 'invalid_type' },
    })
    expect(response.statusCode).toBe(400)
  })

  it('should return 500 when UpdateTransactionUseCase throws', async () => {
    const { sut, updateTransactionUseCase } = makeSut()
    jest.spyOn(updateTransactionUseCase, 'execute').mockRejectedValueOnce(new Error())
    const response = await sut.execute(baseHttpRequest)
    expect(response.statusCode).toBe(500)
  })

  it('should return 404 when TransactionNotFoundError is thrown', async () => {
    const { sut, updateTransactionUseCase } = makeSut()
    jest.spyOn(updateTransactionUseCase, 'execute').mockRejectedValueOnce(new TransactionNotFoundError())
    const response = await sut.execute(baseHttpRequest)
    expect(response.statusCode).toBe(404)
  })

  it('should call UpdateTransactionUseCase with correct params', async () => {
    const { sut, updateTransactionUseCase } = makeSut()
    const executeSpy = jest.spyOn(updateTransactionUseCase, 'execute')
    await sut.execute(baseHttpRequest)
    expect(executeSpy).toHaveBeenCalledWith(
      baseHttpRequest.params.transactionId,
      baseHttpRequest.body,
    )
  })
})
