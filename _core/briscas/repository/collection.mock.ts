import BriscasRow from "$briscas/model/BriscasRow";

import { BriscasCollectionRepository } from "./collection";

export class BriscasCollectionRepositoryMock implements BriscasCollectionRepository {
    map: Record<string, BriscasRow> = {}

    async create(row: BriscasRow): Promise<BriscasRow> {
        this.map[row.rowId] = row;
        return Promise.resolve(row);
    }

    async readById(profileId: string, briscasId: string): Promise<BriscasRow> {
        return Promise.resolve(this.map[briscasId]!!)
    }
}

export default BriscasCollectionRepositoryMock