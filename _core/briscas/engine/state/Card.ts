import CardResult from "./CardResult";

export default class Card {
    constructor(readonly index: number, readonly playerId: string) {}

    static pointMapping: Record<number, number> = {
        0: 11,
        2: 10,
        7: 1,
        8: 2,
        9: 3
    };

    static getPoints(card: Card): number {
		return this.pointMapping[this.determineFace(card.index)] || 0;
    }
    static determineWinner(lifeCard: number, winningCard: Card, card: Card): CardResult {
		var winner = new CardResult(winningCard, "DEFAULT");
        if (winningCard === undefined || winningCard.index === card.index) {
            return winner;
        }



        if ((!this.determineLife(winningCard.index, lifeCard) && this.determineLife(card.index, lifeCard))) {
            winner.card = card;
            winner.reason = "TRUMP"
        }

		if ((this.determineSuit(card.index) === this.determineSuit(winningCard.index))) {
			//If both points = 0, then highest face wins;
			//REASON_POINTS
			if (this.determinePointValue(card.index) > this.determinePointValue(winningCard.index)) {
                winner.card = card;
                winner.reason = "POINTS"
			}

			if (this.determinePointValue(winningCard.index) == this.determinePointValue(card.index)) {
				//REASON_NUMBER
				if (this.determineFace(winningCard.index) > this.determineFace(card.index)) {
					winner.card = winningCard;
				} else {
					winner.card = card;
                }
                winner.reason = "FACE_VALUE"
			}
		} 
		return winner;
    }
	private static determineLife(card: number, lifeCard: number) {
		return this.determineSuit(card) === this.determineSuit(lifeCard);
	}
	private static determineSuit(card: number) {
		return Math.floor(card / 10);
	}
	private static determinePointValue(card: number) {
	}
	private static determineFace(card: number) {
		return card - (this.determineSuit(card) * 10);
	}    
};
