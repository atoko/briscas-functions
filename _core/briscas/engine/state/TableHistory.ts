import CardResult from "./CardResult";
import Card from "./Card";
export default class TableHistory {
    constructor(readonly cards: Card[], readonly result: CardResult) {
        
    }
}
