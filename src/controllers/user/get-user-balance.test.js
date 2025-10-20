import { faker } from '@faker-js/faker'
import { GetUserBalanceController } from './get-user-balance.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('GetUserBalanceController', () => {
  class GetUserBalanceUseCaseStub {
    async execute() {
      return faker.number.int()
    }
  }

  const makeSut = () => {
    const getUserBalanceUseCase = new GetUserBalanceUseCaseStub()
    const sut = new GetUserBalanceController(getUserBalanceUseCase)
    return { sut, getUserBalanceUseCase }
  }

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
    query: {
      from: '2024-01-01',
      to: '2024-01-31',
    },
  }

  it('should return 200 when getting user balance', async () => {
    const { sut } = makeSut()
    const result = await sut.execute(httpRequest)
    expect(result.statusCode).toBe(200)
  })

  it('should return 400 when userId is invalid', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({
      params: { userId: 'invalid_id' },
      query: { from: '2024-01-01', to: '2024-01-31' },
    })
    expect(result.statusCode).toBe(400)
  })

  it('should return 500 if GetUserBalanceUseCase throws', async () => {
    const { sut, getUserBalanceUseCase } = makeSut()
    jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(new Error())

    const result = await sut.execute(httpRequest)
    expect(result.statusCode).toBe(500)
  })

  it('should call GetUserBalanceUseCase with correct params', async () => {
    const { sut, getUserBalanceUseCase } = makeSut()
    const executeSpy = jest.spyOn(getUserBalanceUseCase, 'execute')

    await sut.execute(httpRequest)

    expect(executeSpy).toHaveBeenCalledWith(
      httpRequest.params.userId,
      httpRequest.query.from,
      httpRequest.query.to
    )
  })

  it('should return 404 if GetUserBalanceUseCase throws UserNotFoundError', async () => {
    const { sut, getUserBalanceUseCase } = makeSut()
    jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(new UserNotFoundError())

    const response = await sut.execute(httpRequest)
    expect(response.statusCode).toBe(404)
  })
})
