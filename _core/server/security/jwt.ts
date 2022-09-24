import LoginToken from "./model/loginToken";
import { sign as jwtSign, verify as jwtVerify } from "jsonwebtoken";

//TODO: add token via environment variables
const SECRET = "";
const ALGORITHMS = ["HS256"];

//TODO: add issuer from environment variables

export class JwtTools {
    generateLogin(loginToken: LoginToken): string {
        return jwtSign({
            role: loginToken.role,
            sub: loginToken.id,
            iss: loginToken.host,
            iat: Math.round(Number.parseInt(loginToken.created) / 1000),
            exp: Math.round(Number.parseInt(loginToken.expires) / 1000)
        }, 
        SECRET,
        {
            algorithm: "HS256"
        })
    }

    verify(jwt: string) {
        return jwtVerify(
            jwt,
            SECRET,
            {
                algorithms: ["HS256"]
            }
        )
    }
}

export default new JwtTools()