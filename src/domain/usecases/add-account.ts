export interface AddAccount {
    handle: (data: AddAccount.Request) => Promise<AddAccount.Result>
}

export namespace AddAccount {
    export type Request = {
        email: string
        password: string
        name: string
        lastName: string
        birthDate: Date
        tellphone: string
        cellphone: string
        streetAddress: string
        numberAddress: string
        districtAddress: string
        cityAddress: string
        stateAddress: string
    }
    export type Result = boolean
}
