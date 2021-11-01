import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
interface IOAuth {
    id?: number;
    type: string;
    uid: string;
    userId: number;
}
interface IOAuthCreation extends Optional<IOAuth, "id"> {
}
export declare class OAuth extends Model<IOAuth, IOAuthCreation> {
    id: number;
    type: string;
    uid: string;
    userId: number;
}
export {};
