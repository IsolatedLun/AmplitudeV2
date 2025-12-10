export interface IUser {
    _id: string,
    username: string,
    profile: string,
    favorites: string[]
}

export interface IAuthUserContext {
    user: IUser | null,

    login: (v: IUser, tok: string) => Promise<void>,
    logout: () => void
}