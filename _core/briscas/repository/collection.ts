import BriscasRow from "$briscas/model/BriscasRow"

export class BriscasCollectionRepository {
    map: Record<string, BriscasRow> = {}

    async create(row: BriscasRow): Promise<BriscasRow> {
        this.map[row.rowId] = row;
        return Promise.resolve(row);
    }

    async readById(profileId: string, briscasId: string): Promise<BriscasRow> {
        console.log(this.map)
        return Promise.resolve(this.map[briscasId]!!)
    }
}

export default new BriscasCollectionRepository()