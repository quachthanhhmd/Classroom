import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { User, Course } from "./";
interface IMember {
    id?: number;
    userId: number;
    courseId: number;
    role?: string;
    type?: string;
}
interface MemberCreationAttributes extends Optional<IMember, "id"> {
}
export declare class Member extends Model<IMember, MemberCreationAttributes> {
    id: number;
    userId: number;
    user?: User;
    courseId: number;
    course?: Course;
    role: string;
    type: string;
}
export {};
