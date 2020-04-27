import BriscasRow from "$briscas/model/BriscasRow"
import { BriscasCollectionRepository } from "./collection";

export class BriscasCollectionRepositoryMock implements BriscasCollectionRepository {
    map: Record<string, BriscasRow> = {}

    create(data: BriscasRow): Promise<BriscasRow> {
        this.map[data.id] = data;
        return Promise.resolve(data);
    }

    readById(profileId: string, briscasId: string): Promise<BriscasRow> {
        return Promise.resolve(this.map[briscasId]!!)
    }
}

export default new BriscasCollectionRepositoryMock()