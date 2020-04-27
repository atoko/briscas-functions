import BriscasData from "$briscas/model/BriscasData";
export class BriscasRow implements BriscasData {
    partitionKey!: string;
    rowId: string;
    id!: string;
    state!: import("../engine/state/BriscasState").default;
    settings: any;
    status!: "WAITING" | "PLAYING" | "RESULT";
    created!: string;
    constructor(briscasData: BriscasData) {
        this.rowId = briscasData.id;
        this.partitionKey = briscasData.state!.tableOwner!!;
        this.state = briscasData.state
        this.settings = briscasData.settings
        this.status = briscasData.status
        this.created = briscasData.created
    }
}
