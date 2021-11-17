export type IHttpFormat<T> =  {
    code: number,
    message: string,
    payload: T
}