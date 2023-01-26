export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    email: string;
}