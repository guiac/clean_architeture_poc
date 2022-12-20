import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'

import { faker } from '@faker-js/faker'
import { ok } from '@/presentation/helpers'

const field = faker.random.word()

const mockRequest = (): any => ({
    field
})

type SutTypes = {
    controllerSpy: ControllerSpy
    sut: LogControllerDecorator
}
class ControllerSpy implements Controller {
    input: any
    httpResponse = ok(faker.datatype.uuid())
    async handle(request: any): Promise<HttpResponse> {
        this.input = request
        return this.httpResponse
    }
}

const makeSut = (): SutTypes => {
    const controllerSpy = new ControllerSpy()
    const sut = new LogControllerDecorator(controllerSpy)
    return { sut, controllerSpy }
}

describe('LogControllerDecorator', () => {
    test('Should call Controller with correct values', async () => {
        const { sut, controllerSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(controllerSpy.input).toEqual(request)
    })
})
