import CardResult from "./CardResult";

export default class Card {
    constructor(readonly index: number, readonly playerId: string) {}

    static getPoints(card: Card): number {
        return 0
    }

    static determineWinner(lifeCard: number, winningCard: Card, card: Card): CardResult {
        return new CardResult(card, "")
    }
};
