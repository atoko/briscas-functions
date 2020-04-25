import briscasReducer from "./reducer"
import BriscasState from "./state/BriscasState"
import NewGameAction from "./actions/NewGameAction"
import JoinGameAction from "./actions/JoinGameAction"
import PlayCardAction from "./actions/PlayCardAction"

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
        done()
    })
});

describe("Play card", () => {
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
        let deck = [...Array(40).keys()];
        let playerOneId = "playCardsPlayer1";
        let playerTwoId = "playCardsPlayer2";

        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId),            
            new PlayCardAction(playerOneId, 32)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.table.length).toBe(0)
    })    

    it("should not allow anyone but the current player", () => {
        let deck = [...Array(40).keys()];
        let playerOneId = "playCardsPlayer1";
        let playerTwoId = "playCardsPlayer2";

        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerOneId),
            new JoinGameAction(playerTwoId),            
            new PlayCardAction(playerTwoId, 3)
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())

        expect(state.table.length).toBe(0)
    })        
})