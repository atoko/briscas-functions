import 'module-alias/register'
import 'reflect-metadata'
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import profileService from "$accounts/service/profile"
import authenticationService from "$accounts/service/authentication"
import { AuthenticationOneResponse } from '$accounts/model/response/AuthenticationOneResponse'
import exceptionHandler from '$server/middleware/exception/handler'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        let profile = await profileService.create();
        let credentials = await authenticationService.anonymous(profile);

        context.res = {
            status: 200,
            body: {
                ...new AuthenticationOneResponse(credentials)
            }
        }        
    } catch(e) {
        exceptionHandler(e, context);
    } 
};

export default httpTrigger;

