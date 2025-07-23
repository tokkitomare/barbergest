import { Request, Response, NextFunction } from 'express';

export class APIError extends Error {
    public statusCode: number;
    public errorCode?: number;

    constructor(message: string, statusCode = 500, errorCode?: number) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;

        Object.setPrototypeOf(this, APIError.prototype);
    }

    toResponse(res: Response) {
        return res.status(this.statusCode).json({
            status_code: this.statusCode,
            error_code: this.errorCode,
            message: this.message,
        });
    }

    static err(message: string, statusCode = 500, errorCode?: number) {
        return new APIError(message, statusCode, errorCode);
    }
}
