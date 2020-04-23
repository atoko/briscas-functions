import reducer from "../model/engine/reducer";
import BriscasState from "../model/engine/state";
import { NewGameAction } from "../model/engine/actions";

class BriscasCommandService {
    createGame = (playerId: string, settings: {}) : Promise<any> => {
        let state = reducer(new BriscasState(), new NewGameAction(2))
        let briscasData = {
            id: Math.random() * 10000000,
            state,
            settings,
            status: "WAITING",
            created: Date.now()
        }

        return Promise.resolve(briscasData)
    }
}

export default new BriscasCommandService();