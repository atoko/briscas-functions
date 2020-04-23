import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import BriscasCommandService from "../core/briscas/service/commands";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let briscasData = await BriscasCommandService.createGame("fulano", {});

    //TODO: Parse JWT and fetch player id
    context.res = {
        status: 200,
        body: {
            data: {
                briscas: {
                    ...briscasData
                }
            }
        }
    }
};

export default httpTrigger;
