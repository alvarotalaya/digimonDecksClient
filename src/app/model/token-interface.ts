export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    player: string;
    usertype: string;
}