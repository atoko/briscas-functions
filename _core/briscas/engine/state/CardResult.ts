import Card from "./Card";

export default class CardResult {
    card?: Card
    reason?: string
    constructor(card: Card, reason: string) {
        this.card = card;
        this.reason = reason;
    }
};
