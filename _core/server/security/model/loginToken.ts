import SecurityRoles from "./roles";

const EXPIRATION_IN_MINUTES = 120;

//TODO: customize environment from env vars
const environment = "briscas";

export default class LoginToken {
    expires: string

    constructor(
        readonly id: string, 
        readonly role: string[],
        readonly created: string,
        readonly host: string
    ) {
        this.expires = (Number.parseInt(created) + (EXPIRATION_IN_MINUTES * 60000)).toString()
    }

    static player(id: string) {
        return new LoginToken(
            id,
            [SecurityRoles.LOGIN, SecurityRoles.REGISTERED],
            Date.now().toString(),
            "briscas"
        )
    }

    static anonymous(id: string) {
        return new LoginToken(
            id,
            [SecurityRoles.LOGIN],
            Date.now().toString(),
            "briscas"
        )
    }    
}