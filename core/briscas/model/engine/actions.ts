export interface IAction {
    type: String
}
export class NewGameAction implements IAction {
    static TYPE = "NEW_GAME"
    type: String = NewGameAction.TYPE
    deck: number[]
    tableSize: number
    
    static shuffle = function(array: number[]) {
        for (var c = array.length - 1; c > 1; c--) {
            var r = (Math.random() * c).toFixed(0);
            var one = array[r];
            var two = array[c];

            if (one !== null) {
                array[c] = one;
                array[r] = two;
            }
        }

        return array;
    };
    static randomDeck = (numberOfCards: Number) => {
        return NewGameAction.shuffle([...Array(numberOfCards).keys()]);
    }
    
    constructor(tableSize: number) {
        this.deck = NewGameAction.randomDeck(40);
        this.tableSize = tableSize;
    }
}