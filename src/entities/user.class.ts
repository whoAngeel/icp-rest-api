
export class User {
    id: string
    username: string
    fullname: string
    email: string
    password: string
    role: 'anon' | 'solver' | 'admin'
    location: { postalCode: string, municipality: string }
    
}