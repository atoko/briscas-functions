import accountsCredentialsGuestCreate from "./index";
import mockContext from "$server/mocks/context.mock";

describe("controller", () => {
    it("Returns 200 with id and token", async () => {
        const context = mockContext();
        await accountsCredentialsGuestCreate(context, {
            body: {
                bot: 400
            }
        })

        expect(context.res.status).toBe(200);
        expect(context.res.body.data.authentication.id).toBeTruthy();
        expect(context.res.body.data.authentication.token).toBeTruthy();
        expect(context.res.body.data.authentication.expires).toBeTruthy();                
    })
})