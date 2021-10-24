export type IHttpFormat<T> =  {
    code: string,
    message: string,
    payload: T
}