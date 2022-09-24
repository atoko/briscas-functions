import {Max, IsOptional} from "class-validator"

export default class BriscasCreateRequest {
    @Max(9)
    @IsOptional()
    bot: number | undefined
}