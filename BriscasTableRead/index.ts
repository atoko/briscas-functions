import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import briscasQueryService  from "$briscas/service/query";
import { BriscasOneResponse } from "$briscas/model/response";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let briscasData = await briscasQueryService.readBriscasById(req.query.playerId, req.query.briscasId.toString());

    //TODO: Parse JWT and fetch player id
    context.res = {
        status: 200,
        body: {
            ...new BriscasOneResponse(briscasData, "fulano")
        }
    }
};

export default httpTrigger;
