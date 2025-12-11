import { RUserLogin_Ok } from "@/api/user/types"

export interface IUser {
    _id: string,
    username: string,
    profile: string,
    favorites: string[]
}

export interface IAuthUserContext {
    user: IUser | null,

    login: (data: RUserLogin_Ok) => Promise<void>,
    logout: () => void
}