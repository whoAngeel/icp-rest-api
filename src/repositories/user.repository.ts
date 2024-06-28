import { Err, StableBTreeMap } from "azle";
import { IUserOptions, User } from "../entities/user.class";
import { ErrorOr } from "../entities/ErrorOr";

export class UserRepository {
    private userStorage: any
    constructor() {
        this.userStorage = StableBTreeMap<string, User>(0)
    }

    public registerUser(data: IUserOptions): ErrorOr<User> {
        let user: User = new User(data)
        // user.password = hash(data.password, 10)
        this.userStorage.insert(user.id, user)
        return ErrorOr.ok(user)
    }

    public findAll(): User[] {
        return this.userStorage.values()
    }

    public findById(id: string): ErrorOr<User> {
        const user = this.userStorage.get(id)
        if ("None" in user) return ErrorOr.error("User not found")
        return ErrorOr.ok(user.Some)
    }
}