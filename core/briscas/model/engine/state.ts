class PlayerState {
    id: string
    profileId: string
    nextPlayer: string
    isBot: boolean
    hand: number[]
    points: number
    team: number
    pile: number[]
}

class Card {

}

class CardResult {

}

class TableHistory {
    cards: Card[]
    result: CardResult
}

interface PlayerMap {
    [playerId: string] : PlayerState
}

class BriscasState {
    deck: number[] = []
    tableSize : number = 0
    tableOwner: string | null
    life: number | null
    players: PlayerMap = {}
    table: Card[] = []
    lastTable: TableHistory | null
    turnSequence: string[] = []
    versionKey: Number = 0
}
export default BriscasState