import { BriscasData } from "../BriscasData"

export class BriscasResponse {
    constructor(briscasData: BriscasData, playerId: String) {
        Object.assign(this, briscasData)
    }
}

export class BriscasOneResponse {
    data?: {
        briscas: BriscasResponse
    }
    error?: any

    constructor(data: BriscasData, playerId: String) {
        this.data = {
            briscas: new BriscasResponse(data, playerId)
        }
    }
}