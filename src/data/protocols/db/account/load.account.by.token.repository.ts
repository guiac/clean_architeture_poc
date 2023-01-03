import { LoadAccountByToken } from '@/domain/usecases'

export interface LoadAccountByTokenRepository {
    loadAccountByToken: (accessToken: string) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByTokenRepository {
    export type Result = LoadAccountByToken.Result
}
