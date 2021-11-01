import { IResponse, INextFunction } from "../interfaces";
export declare const validate: (schema: object) => (req: any, res: IResponse, next: INextFunction) => void;
