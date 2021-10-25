export interface IToken {
    token: string;
    expire: Date;
}

export interface ITokenResponse {
    refresh: IToken;
    access: IToken;
}

export interface IPayload {
    sub: number;
    iat: number;
    exp: number;
    type: string;
}

export interface IRefreshToken {
    refreshToken: string,
}

