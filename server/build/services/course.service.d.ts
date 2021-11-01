import "reflect-metadata";
import { ICreateCourse } from "../interfaces";
import { Course } from "../models";
import { MemberService } from "./";
export declare class CourseService {
    private readonly _memberService;
    constructor(_memberService: MemberService);
    /**
     * Create a new class.
     * @param id
     * @param courseBody
     * @returns
     */
    createCourse: (id: number, courseBody: ICreateCourse) => Promise<Course>;
    getCourseDetail: (id: number) => Promise<Course | null>;
}
