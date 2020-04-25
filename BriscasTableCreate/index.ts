import 'module-alias/register'
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import BriscasCommandService from "@@briscas/service/commands";
import { BriscasOneResponse } from "@@briscas/model/response";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let briscasData = await BriscasCommandService.createGame("fulano", {});

    //TODO: Parse JWT and fetch player id
    context.res = {
        status: 200,
        body: {
            ...new BriscasOneResponse(briscasData, "fulano")
        }
    }
};

export default httpTrigger;
