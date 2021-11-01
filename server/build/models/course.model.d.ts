import { Model } from "sequelize-typescript";
import { Member } from "./";
export declare class Course extends Model {
    id: number;
    name: string;
    code: string;
    description?: string;
    topic?: string;
    studentLimit: number;
    studentExist: number;
    avatarUrl?: string;
    backgroundUrl?: string;
    memberList: Member[];
}
