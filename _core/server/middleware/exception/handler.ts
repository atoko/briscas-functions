import { Context } from "@azure/functions";
export default async function exceptionHandler(exception: any, context: Context) {
    if (exception.error && exception.status && exception.error.code) {
        context.res = {
            status: exception.status,
            body: {
                error: exception.error
            }
        };
    }
    else {
        console.error(exception);
        context.res = {
            status: 500,
            body: {
                error: {
                    code: "UNKNOWN_EXCEPTION",
                    reason: "Server encountered an unknown exception",
                    date: Date.now()
                }
            }
        };
    }
}
