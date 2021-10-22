import "reflect-metadata";

import { injectable, inject } from "inversify";
import { ICreateCourse, ICourseInfor } from "../interfaces";
import { Course } from "../models";
import { MemberService } from "./";
import { MEMBERSTATE, TYPEROLE } from "../constants";
import { IPagingParams, filterPagination, IPagingResult } from "../models";
import { FindOptions } from "sequelize/types";

@injectable()
export class CourseService {

    constructor(@inject("MemberService") private readonly _memberService: MemberService) { }

    /**
     * Create a new class.
     * @param id 
     * @param courseBody 
     * @returns 
     */
    public createCourse = async (id: number, courseBody: ICreateCourse): Promise<Course> => {
        const newCourse = await Course.create({
            ownerId: id,
            ...courseBody,
        })

        await this._memberService.addMember(id, newCourse.id, TYPEROLE.TEACHER, MEMBERSTATE.ACCEPT);
        return newCourse;
    }

   
}