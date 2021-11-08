import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

// jest.mock('bcrypt', () => ({
//   async hash (): Promise <string> {
//     return await new Promise(resolve => resolve('valid_hash'))
//   }
// }))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should creturn a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('valid_hash')
  })

  test('Should throw error if bcrypt throws error', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
