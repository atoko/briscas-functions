import { BaseError, ServiceError } from "./Error";
import { ValidationError } from "class-validator";

export default class BadRequestException implements ServiceError {
    status = 400;
    error = {
        rootCauses: [] as BaseError[],
        code: "BAD_REQUEST",
        reason: "Malformed Request",
        date: Date.now().toString()
    };

    constructor(validations?: ValidationError[]) {
        if (validations) {
            this.error.rootCauses = validations.map((ve) => {
                return {
                    code: "INVALID_PROPERTY",
                    reason: `Invalid ${ve.property}: ${JSON.stringify(ve.constraints)}`
                }
            });
        }
    }
}
