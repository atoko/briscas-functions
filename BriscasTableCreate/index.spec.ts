import briscasTableCreate from "./index";
import LoginToken from "$server/security/model/loginToken";
import SecurityRoles from "$server/security/model/roles";
import jwtTools from "$server/security/jwt";
import mockContext from "$server/mocks/context.mock";

describe("controller", () => {
    const playerOne = new LoginToken(
        "guid",
        [SecurityRoles.LOGIN],
        Date.now(),
        "Test"
    );
    const headers = {
        authorization: `Bearer ${jwtTools.generateLogin(playerOne)}`,
    }

    it("Returns 200 when bot level is not passed in", async () => {
        const context = mockContext();
        await briscasTableCreate(context, {
            body: {},
            headers
        })

        expect(context.res.status).toBe(200);
    })    
    it("Returns 200 when bot level is passed in", async () => {
        const context = mockContext();
        await briscasTableCreate(context, {
            body: {
                bot: 3
            },
            headers           
        })

        expect(context.res.status).toBe(200);
    })        
    it("Returns 400 when bot level is invalid", async () => {
        const context = mockContext();
        await briscasTableCreate(context, {
            body: {
                bot: 400
            },
            headers       
        })

        expect(context.res.status).toBe(400);
        expect(context.res.body.error.code).toBe("BAD_REQUEST");
    })
    it("Returns 400 when extra parameters are passed in", async () => {
        const context = mockContext();
        await briscasTableCreate(context, {
            body: {
                bot: 3,
                bla: "nah"
            },
            headers        
        })

        expect(context.res.status).toBe(400);
        expect(context.res.body.error.code).toBe("BAD_REQUEST");
    })    
    it("Returns 400 when an array is passed in", async () => {
        const context = mockContext();
        await briscasTableCreate(context, {
            body: [{
                bot: 3
            }],
            headers        
        })

        expect(context.res.status).toBe(400);
        expect(context.res.body.error.code).toBe("BAD_REQUEST");
    })        
})