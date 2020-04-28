import briscasCollectionRepository, { BriscasCollectionRepository } from "$briscas/repository/collection";
import { BriscasData } from "$briscas/model/BriscasData";
import BriscasRow from "$briscas/model/BriscasRow";

export class BriscasQueryService {
    constructor(
        readonly briscasCollectionRepository: BriscasCollectionRepository
    ) {}


    async readBriscasById(profileId: string, briscasId: string) : Promise<BriscasData> {
        let row = await this.briscasCollectionRepository.readById(profileId, briscasId)
        return BriscasRow.toData(row)
    }
}

export default new BriscasQueryService(briscasCollectionRepository);