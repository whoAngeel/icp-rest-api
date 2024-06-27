export interface IUser{
    username: string
    firstname: string
    lastname: string
    password: string
    role: 'anon' | 'admin' | 'solver'
    address?: string
}