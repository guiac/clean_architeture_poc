export interface LoadAccountByToken {
    handle: (data: LoadAccountByToken.Request) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
    export type Request = {
        accessToken: string
    }
    export type Result = {
        email: string
        name: string
        lastName: string
        identification: string
        birthDate: Date
        tellphone: string
        cellphone: string
        streetAddress: string
        numberAddress: string
        districtAddress: string
        cityAddress: string
        stateAddress: string
        accessToken: string
    }
}
