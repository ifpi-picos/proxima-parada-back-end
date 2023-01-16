class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }

    toJson() {
        console.log("testando retorno de erro para login 2: ", this.statusCode);
        return {
            statusCode: this.statusCode,
            message: this.message,
        };
    }
}

export default AppError;
