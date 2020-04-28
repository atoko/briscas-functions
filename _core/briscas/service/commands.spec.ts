import { BriscasCommandService } from "./commands"
import BriscasCollectionRepositoryMock from "$briscas/repository/collection.mock"

let commandService: BriscasCommandService;

beforeEach(() => {
    let mockRepository = new BriscasCollectionRepositoryMock();
    commandService = new BriscasCommandService(mockRepository);
})
describe("createGame", () => {

    it("returns a briscasData with id and status waiting", async (done) => {
        let playerId = "playerId";
        let data = await commandService.createGame(playerId, {})
        expect(data.id).toBeTruthy()
        expect(data.status).toEqual("WAITING")
        done()
    })
})