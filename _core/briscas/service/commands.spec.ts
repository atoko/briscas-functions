import { BriscasCommandService } from "./commands"
import briscasCollectionRepositoryMock from "$briscas/repository/collection.mock"

const serviceInstance = new BriscasCommandService(briscasCollectionRepositoryMock)

describe("createGame", () => {

    it("returns a briscasData with id and status waiting", async (done) => {
        let playerId = "playerId";
        let data = await serviceInstance.createGame(playerId, {})
        expect(data.id).toBeTruthy()
        expect(data.status).toEqual("WAITING")
        done()
    })
})