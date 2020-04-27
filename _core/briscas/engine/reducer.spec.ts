import briscasReducer from "./reducer"
import BriscasState from "./state/BriscasState"
import NewGameAction from "./actions/NewGameAction"
import JoinGameAction from "./actions/JoinGameAction"
import PlayCardAction from "./actions/PlayCardAction"

const randomDeck = () => [...Array(40).keys()];

describe("New Game", () => {
    it("Initializes deck and life", async (done) => {
        let deck = [...Array(40).keys()];
        let state = briscasReducer(new BriscasState(), new NewGameAction(2, deck));
        expect(state.deck?.length).toBe(40)
        expect(state.life).toBe(39)
        done()
    })
})

describe("Join game", () => {
    it("Initializes tableOwner when first player joins", async (done) => {
        let playerOneId = "initTableowner";
        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerOneId),
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        let playerOne = Object.keys(state.players)
            .map(pid => state.players[pid])
            .find(p => p.profileId == playerOneId);

        expect(state.tableOwner).toBe(playerOneId)
        expect(Object.keys(state.players).length).toBe(1)
        expect(playerOne!!.hand.length).toBe(0)
        done()
    })    

    it("doesnt allow the same player to join twice", async (done) => {
        let playerOneId = "doesntallowtwice";
        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerOneId)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(Object.keys(state.players).length).toBe(1)
        done()
    })
    

    it("doesnt allow joining when table is full", async (done) => {
        let playerOneId = "playerOne";
        let playerTwoId = "playerTwo";
        let playerThreeId = "INVALIDplayerThree";

        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId),
            new JoinGameAction(playerThreeId)
        ].reduce((previousState, currentAction) => {
            return briscasReducer({...previousState}, currentAction)
        }, new BriscasState())

        expect(Object.keys(state.players).length).toBe(2)
        expect(state.turnSequence.length).toBe(2)
        done()
    })    
})

describe("Start game transition", () => {
    it("deals cards when two players join", async (done) => {
        let playerOneId = "dealsCardsPlayer1";
        let playerTwoId = "dealsCardsPlayer2";        
        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.deck?.length).toBe(40 - 6)
        Object.keys(state.players)
            .map(pid => state.players[pid])
            .forEach((player) => {
                expect(player.hand.length).toBe(3)
        })
        done()
    })
});

describe("Play card", () => {
    it("should add card to table", () => {      
        let playerOneId = "playCardsPlayer1";
        let playerTwoId = "playCardsPlayer2";        
        let state = [
            new NewGameAction(2, randomDeck()),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId),     
            new PlayCardAction(playerOneId, 4)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.table.length).toBe(1)
        expect(state.table[0].index).toBe(4)
    })

    it("should not allow play when table isn't full", () => {
        let playerOneId = "playCardsPlayer1";
        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerOneId),
            new PlayCardAction(playerOneId, 32)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.table.length).toBe(0)
    })

    it("should not allow a card that isn't in the players hand", () => {
        let playerOneId = "playCardsPlayer1";
        let playerTwoId = "playCardsPlayer2";

        let state = [
            new NewGameAction(2, randomDeck()),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId),            
            new PlayCardAction(playerOneId, 32)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.table.length).toBe(0)
    })    

    it("should not allow anyone but the current player", () => {
        let playerOneId = "playCardsPlayer1";
        let playerTwoId = "playCardsPlayer2";

        let state = [
            new NewGameAction(2, randomDeck()),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId),            
            new PlayCardAction(playerTwoId, 3)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.table.length).toBe(0)
    })
    
})

describe("turn transition", () => {
    it("clears table and sets lastTable", () => {
        let playerOneId = "playCardsPlayer1";
        let playerTwoId = "playCardsPlayer2";        
        let state = [
            new NewGameAction(2, randomDeck()),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId),     
            new PlayCardAction(playerOneId, 2),
            new PlayCardAction(playerTwoId, 1)            
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.table.length).toBe(0)
        expect(state.lastTable).toBeTruthy()
        expect(state.lastTable?.cards.some(c => c.index == 2)).toBeTruthy()
        expect(state.lastTable?.cards.some(c => c.index == 1)).toBeTruthy()        
    })
})

describe("game", () => {
    test.todo("player hands are empty after all cards played")
})

describe("forfeit game", () => {
    test.todo("assigns remaining points")
})