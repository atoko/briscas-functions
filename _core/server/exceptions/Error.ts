export interface BaseError {
    code: string;
    reason: string;
    date?: string;
}
export interface ServiceError {
    status: number;
    error: {
        rootCauses?: BaseError[];
    } & BaseError;
}

