export class ErrorOr<T> {
    constructor(private error: string, private value: T | null) { }

    static ok<T>(value: T): ErrorOr<T> {
        return new ErrorOr<T>('', value);
    }

    static error<T>(error: string): ErrorOr<T> {
        return new ErrorOr<T>(error, null);
    }

    isError(): boolean {
        return this.error !== '';
    }

    isOk(): boolean {
        return !this.isError();
    }

    getError(): string {
        return this.error;
    }

    getValue(): T {
        if (this.value === null) {
            throw new Error('Value is null');
        }

        return this.value!;
    }


}