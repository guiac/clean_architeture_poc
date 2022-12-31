import { AccountMongoRepository, MongoHelper } from '@/infra/db/mongodb'
import { AccountModel } from '@/infra/db/mongodb/models'
import { AddAccountRepository } from '@/data/protocols'

import { faker } from '@faker-js/faker'

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

const databaseName = 'test'

const addAccountParams = (): AddAccountRepository.Params => ({
    email: 'any_email@gmail.com',
    password: 'any_password',
    identification: 'identification',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress'
})

describe('AccountMongoRepository', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`
        await MongoHelper.connect(url)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        await AccountModel.deleteMany({})
    })

    describe('save()', () => {
        test('Should return an account on success', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            const account = await sut.save(request)
            expect(account).toBeTruthy()
        })
    })

    describe('checkByEmail()', () => {
        test('Should return true if email is valid', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await sut.save(request)
            const exists = await sut.checkAccountByEmail(request.email)
            expect(exists).toBe(true)
        })

        test('Should return false if email is not valid', async () => {
            const sut = makeSut()
            const exists = await sut.checkAccountByEmail(faker.internet.email())
            expect(exists).toBe(false)
        })
    })

    describe('loadAccountByEmail()', () => {
        test('Should return account if email is valid', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await sut.save(request)
            const account = await sut.loadAccountByEmail(request.email)
            expect(account).toHaveProperty('identification')
        })

        test('Should return null if email is invalid', async () => {
            const sut = makeSut()
            const exists = await sut.loadAccountByEmail(faker.internet.email())
            expect(exists).toBeNull()
        })
    })

    describe('update()', () => {
        test('Should return account updated on success', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await sut.save(request)
            const accountUpdated = await sut.update({ identification: 'identification', name: 'updatedName' })
            expect(accountUpdated.name).toBe('updatedName')
        })
    })

    describe('checkAccountById()', () => {
        test('Should return true if identification is valid', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await sut.save(request)
            const exists = await sut.checkAccountById(request.identification)
            expect(exists).toBe(true)
        })

        test('Should return false if identification is not valid', async () => {
            const sut = makeSut()
            const exists = await sut.checkAccountById(faker.random.word())
            expect(exists).toBe(false)
        })
    })

    describe('updateAccessToken()', () => {
        test('Should return true on success', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await sut.save(request)
            const updateAccessToken = await sut.updateAccessToken({ identification: request.identification, accessToken: faker.random.word() })
            expect(updateAccessToken).toBeTruthy()
        })
        test('Should return false if identification is invalid', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await sut.save(request)
            const updateAccessToken = await sut.updateAccessToken({ identification: 'invalid_identification', accessToken: faker.random.word() })
            expect(updateAccessToken).toBeFalsy()
        })
    })
})
