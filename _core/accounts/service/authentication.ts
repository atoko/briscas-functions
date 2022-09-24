import {v4 as uuidv4} from "uuid";
import ProfileData from "../model/ProfileData";
import LoginToken from "$server/security/model/loginToken";

export class AuthenticationService {
    anonymous(profile: ProfileData): Promise<LoginToken> {
        return Promise.resolve(LoginToken.anonymous(profile.id!!))
    }
}

export default new AuthenticationService()