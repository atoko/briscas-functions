import { BriscasState } from "@@briscas/engine/state/BriscasState"

export type BriscasData = {
    id: string 
    state: BriscasState
    settings: any
    status: "WAITING" | "PLAYING" | "RESULT"
    created: string
}