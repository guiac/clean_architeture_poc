import { LoadAccountByToken } from '@/domain/usecases'

export interface LoadAccountByTokenRepository {
    load: (accessToken: string, role?: string) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByTokenRepository {
    export type Result = LoadAccountByToken.Result
}
