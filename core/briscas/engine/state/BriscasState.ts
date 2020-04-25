import Card from "./Card";
import TableHistory from "./TableHistory";
import PlayerState from "./PlayerState";

export default class BriscasState {
    deck?: number[];
    tableSize?: number;
    tableOwner?: string;
    life?: number;
    players: Record<string, PlayerState> = {};
    table: Card[] = [];
    lastTable?: TableHistory;
    turnSequence: string[] = [];
    versionKey: number = 0;

    static nextToPlay(state: BriscasState): string | null {
        if (state.turnSequence.length > 0) {
            return state.turnSequence[0];
        } else {
            return null;
        }
    }
}
