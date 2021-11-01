import "reflect-metadata";
import { IResponse, INextFunction, IAuthorizeRequest } from './../interfaces';
export declare class Authenticate {
    private verifyCallback;
    /**
     * Function to autheticate role for user when try to connect any url which must use authetication.
     * Remenber that if you want to have more Role, you can add an array as a parameter in function below
     * And pass them in the head function.
     */
    authenticate: () => (req: IAuthorizeRequest, res: IResponse, next: INextFunction) => Promise<void>;
}
