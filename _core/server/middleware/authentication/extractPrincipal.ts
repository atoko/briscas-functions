import { HttpRequest } from "@azure/functions";
import jwtTools from "$server/security/jwt";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import LoginToken from "$server/security/model/loginToken";

const REGEX_PARSE_AUTH_HEADER = /Bearer (.*)/;

export default (request: HttpRequest): Promise<LoginToken> => {
    try {
        if (request.headers && request.headers["authorization"]) {
            let authorization = REGEX_PARSE_AUTH_HEADER.exec(request.headers["authorization"]);
            if (authorization?.[1] != null) {
                let jwt = jwtTools.verify(authorization[1]) as any
                return Promise.resolve(new LoginToken(
                    jwt.sub,
                    jwt.role,
                    jwt.iat,
                    jwt.iss
                ));    
            }
        }

        throw new JsonWebTokenError("Could not parse from header");        
    } catch(e) {
        if (e instanceof TokenExpiredError) {
            throw {
                status: 425,
                error: {
                    code: "ACCESS_EXPIRED",
                    reason: "Token expiration date is in the past",
                    date: Date.now()
                }
            }
        }

        if (e instanceof JsonWebTokenError) {
            throw {
                status: 401,
                error: {
                    code: "UNAUTHORIZED",
                    reason: "Could not verify authentication",
                    date: Date.now()    
                }
            }    
        }

        throw e;
    }
}