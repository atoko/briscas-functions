import 'module-alias/register'
import 'reflect-metadata'
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import briscasCommandService from "$briscas/service/commands";
import BriscasCreateRequest from "$briscas/model/request/BriscasCreateRequest";
import { BriscasOneResponse } from "$briscas/model/response/BriscasResponse";

import exceptionHandler from '$server/middleware/exception/handler';
import validateObjectRequestBody from '$server/middleware/validation/objectRequestBody';
import extractPrincipal from '$server/middleware/authentication/extractPrincipal';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const principal = await extractPrincipal(req);
        //TODO: Require role
        const validatedRequest = await validateObjectRequestBody(BriscasCreateRequest, req.body);
        let briscasData = await briscasCommandService.createGame(
            principal.id, 
            validatedRequest
        );
    
        context.res = {
            status: 200,
            body: {
                ...new BriscasOneResponse(briscasData, "fulano")
            }
        }        
    } catch(e) {
        exceptionHandler(e, context);
    } 
};

export default httpTrigger;
