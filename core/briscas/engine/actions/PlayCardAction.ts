import IAction from "./IAction";
export default class PlayCardAction implements IAction {
    static TYPE = "PLAY_CARD";
    type: string = PlayCardAction.TYPE;

    constructor(readonly profileOrPlayerId: string, readonly card: number) {}
}
