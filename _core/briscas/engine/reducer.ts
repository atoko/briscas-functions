import BriscasState from "./state/BriscasState";
import IAction from "./actions/IAction";
import NewGameAction from "./actions/NewGameAction";
import JoinGameAction from "./actions/JoinGameAction";
import PlayerState from "./state/PlayerState";
import PlayCardAction from "./actions/PlayCardAction";
import Card from "./state/Card";
import CardResult from "./state/CardResult";
import TableHistory from "./state/TableHistory";

const newGame = (state: BriscasState, action: NewGameAction): BriscasState => {
    let [life] = action.deck.slice(-1);
    return {
        ...state,
        deck: action.deck,
        tableSize: action.tableSize,
        life
    }
}

const joinGame = (state: BriscasState, action: JoinGameAction): BriscasState => {
    let playerCount = Object.keys(state.players).length;
    if (playerCount >= state.tableSize!!) {
        return { ...state };
    }
    let teamSize = state.tableSize!! / 2;
    let teamIndex

    if (teamSize > 1) {
        teamIndex = playerCount % teamSize
    } else {
        teamIndex = playerCount
    }

    let player = new PlayerState(teamIndex, action.profileId)
    let players = { ...state.players };
    if (action.profileId) {
        if (Object.keys(players).map(pid => players[pid].profileId).find((prid) => prid == player.profileId)) {
            return { ...state }
        }
    }
    players[player.id!!] = player;

    let turnSequence = [...state.turnSequence];
    turnSequence.push(player.id!!)

    let tableOwner = state.tableOwner;
    if (tableOwner === undefined) {
        tableOwner = action.profileId
    }

    playerCount = Object.keys(players).length;
    Object.keys(players).forEach((pid) => {
        let p = players[pid];
        let index = turnSequence.indexOf(p.id!!)
        if (index + 1 >= playerCount) {
            p.nextPlayer = turnSequence[0]
        } else {
            p.nextPlayer = turnSequence[index + 1]
        }
    })

    return { 
        ...state,
        players,
        tableOwner,
        turnSequence,
        versionKey: state.versionKey + 1
    };
}

const startGameTransition = (state: BriscasState): BriscasState => {
    let players = {...state.players};
    let deck = [...state.deck!!]
    let playerCount = Object.keys(state.players).length

    if (playerCount === state.tableSize && state.deck!!.length === 40) {
        for (let i = 0; i < 3; i++) {
            state.turnSequence.forEach((turn) => {
                let card = deck.shift();
                if (card !== undefined) {
                    players[turn].hand.push(card)
                }
            })
        }
    }
    return { 
        ...state,
        players,
        deck,
        versionKey: state.versionKey + 1
    }
}

const playCard = (state: BriscasState, action: PlayCardAction): BriscasState => {
    let playerCount = Object.keys(state.players).length
    if (playerCount < state.tableSize!!) {
        return { ...state }
    }


    let nextPlayerId = BriscasState.nextToPlay(state);
    if (nextPlayerId === null) {
        return { ...state }
    }

    let nextPlayer = { ...state.players[nextPlayerId!!] };    
    if (nextPlayer?.hand.find(c => c === action.card)) {
        nextPlayer.hand = nextPlayer.hand.filter(c => c !== action.card)
        
        if (nextPlayer.isBot && action.profileOrPlayerId === nextPlayerId
            || nextPlayer.profileId === action.profileOrPlayerId
        ) {
            let players = {
                ...state.players,
                [nextPlayerId!!]: nextPlayer
            }
            
            let table = [...state.table, new Card(action.card, nextPlayerId!!)];
            let turnSequence = [...state.turnSequence];
            turnSequence.shift();

            return {
                ...state,
                players,
                table,
                turnSequence,
                versionKey: state.versionKey + 1
            }        
        }
    }
    return { ...state }
}

const turnTransition = (state: BriscasState): BriscasState => {
    let tableCount = state.table.length;
    if (tableCount > 0 && tableCount % state.tableSize!! == 0) {
        let winResult: CardResult | undefined
        let winCard: Card | undefined
        let points: number = 0

        let table = [...state.table]
        do {
            let card = table.shift();
            points += Card.getPoints(card!!)

            if (winCard === undefined) {
                winCard = card
            } else {
                winResult = Card.determineWinner(state.life!!, winCard!!, card!!)
                winCard = winResult!!.card
            }
        } while(table.length > 0)

        let lastTable = new TableHistory(state.table, winResult!!)
        let winner = { ...state.players[winCard?.playerId!!] }
        winner.points += points;

        let players = {...state.players}
        let turnSequence: string[] = []
        let player = winner;
        let deck = [...state.deck!!];
        state.turnSequence.forEach(() => {
            turnSequence.push(player.id!!);
            if (deck.length > 0) {
                player.hand.push(deck.shift()!!)
            }
            player = players[player.nextPlayer!!]
        })

        return { 
            ...state, 
            table: [], 
            players, 
            deck, 
            turnSequence,
            lastTable
        };
    } else {
        return { ...state }
    }
}

export default (state: BriscasState, action: IAction): BriscasState => {
    switch (action.type) {
        case NewGameAction.TYPE: 
            return newGame(state, action as NewGameAction)
        case JoinGameAction.TYPE:
            return startGameTransition(joinGame(state, action as JoinGameAction))
        case PlayCardAction.TYPE:
            return turnTransition(playCard(state, action as PlayCardAction))
    }

    return state;
}