import BriscasState from "./state";
import { IAction, NewGameAction } from "./actions";

export default (state: BriscasState, action: IAction): BriscasState => {
    let mutatedState = { ...state };
    switch (action.type) {
        case NewGameAction.TYPE: 
            let newGame = (action as NewGameAction);
            state.deck = newGame.deck;
            state.tableSize = newGame.tableSize;
            break;
    }

    return mutatedState;
}