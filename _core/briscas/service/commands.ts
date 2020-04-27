import briscasReducer from "$briscas/engine/reducer";
import BriscasState from "$briscas/engine/state/BriscasState";
import NewGameAction from "$briscas/engine/actions/NewGameAction";
import JoinGameAction from "$briscas/engine/actions/JoinGameAction";
import BriscasData from "$briscas/model/BriscasData";
import BriscasRow from "$briscas/model/BriscasRow";
import briscasCollectionRepository, { BriscasCollectionRepository } from "$briscas/repository/collection";

export class BriscasCommandService {
    constructor(
        readonly briscasCollectionRepository: BriscasCollectionRepository
    ) {}
    
    createGame = (playerId: string, settings: {}) : Promise<BriscasData> => {
        let state = [
            new NewGameAction(2),
            new JoinGameAction(playerId)            
        ].reduce((previousState, currentAction) => {
            return briscasReducer(previousState, currentAction)
        }, new BriscasState())
        let data: BriscasData = {
            id: (Math.random() * 10000000).toString(),
            state,
            settings,
            status: "WAITING",
            created: Date.now().toString()
        }

        return this.briscasCollectionRepository.create(new BriscasRow(data))
            .then(row => data)
    }
}

export default new BriscasCommandService(briscasCollectionRepository);