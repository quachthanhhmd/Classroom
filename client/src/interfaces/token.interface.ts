export interface ITokenResponse {
    refresh: string,
    access: string,
}

export interface IPayload {
    sub: number,
    iat: number,
    exp: number,
    type: string
}