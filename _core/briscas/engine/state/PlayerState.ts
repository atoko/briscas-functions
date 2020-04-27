export default class PlayerState {
    id?: string;
    profileId?: string;
    isBot?: boolean;
    nextPlayer?: string;
    team?: number;
    hand: number[] = [];
    points: number = 0;
    pile: number[] = [];

    constructor(team: number, profileId?: string) {
        const jitter = Math.round((Math.random() * 30000) - 15000)
        this.id = (Date.now() + jitter).toString().slice(-6);
        this.team = team;
        if (profileId) {
            this.profileId = profileId;
            this.isBot = false;
        } else {
            this.isBot = true;
        }
    }
}
