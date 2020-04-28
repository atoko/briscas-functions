import { BriscasCommandService } from "./commands"
import { BriscasQueryService } from "./query"

import BriscasCollectionRepositoryMock from "$briscas/repository/collection.mock"

let commandService: BriscasCommandService;
let queryService: BriscasQueryService;

beforeEach(() => {
    let mockRepository = new BriscasCollectionRepositoryMock();
    commandService = new BriscasCommandService(mockRepository)
    queryService = new BriscasQueryService(mockRepository)    
})

describe("readById", () => {
    it("returns a briscasData by player id and id", async (done) => {
        let playerId = "playerId";
        let data = await commandService.createGame(playerId, {})
        let response = await queryService.readBriscasById(playerId, data.id)        
        expect(data.id).toBe(response.id)
        expect(data.status).toEqual("WAITING")
        done()
    })
})