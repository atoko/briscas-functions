import reducer from "@@briscas/engine/reducer";
import NewGameAction from "@@briscas/engine/actions/NewGameAction";
import BriscasState from "@@briscas/engine/state/BriscasState";
import { BriscasData } from "@@briscas/model/data";

export class BriscasCommandService {
    briscasRepository = null;
    
    constructor(briscasRepository: any) {

    }
    
    createGame = (playerId: string, settings: {}) : Promise<any> => {
        let state = reducer(new BriscasState(), new NewGameAction(2))
        let briscasData: BriscasData = {
            id: (Math.random() * 10000000).toString(),
            state,
            settings,
            status: "WAITING",
            created: Date.now().toString()
        }

        return Promise.resolve(briscasData)
    }
}

export default new BriscasCommandService(null);