import { v4 } from "uuid";

export interface IUserLocation {
    municipality: string;
    state: string;
}

export interface IUserOptions {
    id: string;
    fullname?: string;
    email: string;
    password: string;
    role?: 'anon' | 'solver' | 'admin';
    location?: IUserLocation;
}

export class User {
    readonly id: string;
    private fullname: string;
    private email: string;
    private password: string;
    private role: 'anon' | 'solver' | 'admin';
    private location: IUserLocation;

    constructor(options: IUserOptions) {
        this.id = v4();
        this.fullname = options.fullname || '';
        this.email = options.email;
        this.password = options.password;
        this.role = options.role || 'anon';
        this.location = options.location || { municipality: '', state: '' };
    }

   

}