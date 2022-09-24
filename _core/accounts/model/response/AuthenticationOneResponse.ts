import jwtTools from "$server/security/jwt";
import LoginToken from "$server/security/model/loginToken";

export class AuthenticationResponse {

    constructor(    
        readonly id: string,
        readonly token: string,
        readonly expires: string
    ) {}
}

export class AuthenticationOneResponse {
    data?: {
        authentication: AuthenticationResponse
    }
    error?: any

    constructor(loginToken: LoginToken) {
        this.data = {
            authentication: new AuthenticationResponse(
                loginToken.id,
                jwtTools.generateLogin(loginToken),
                loginToken.expires
            )
        }
    }
}