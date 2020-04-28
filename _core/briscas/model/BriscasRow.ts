import BriscasData from "$briscas/model/BriscasData";
export default class BriscasRow implements BriscasData {
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

    static toData(row: BriscasRow) {
        return {
            id: row.rowId,
            state: row.state,
            settings: row.settings,
            status: row.status,
            created: row.created
        }
    }
}
