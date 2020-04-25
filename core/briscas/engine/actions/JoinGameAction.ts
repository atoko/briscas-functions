import IAction from "./IAction";
export default class JoinGameAction implements IAction {
    static TYPE = "JOIN_GAME";
    type: string = JoinGameAction.TYPE;

    constructor(readonly profileId?: string) {}
}
