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

    /**
     * Get detail information of course
     * @param {number} id 
     * @returns 
     */
    public getCourseDetail = async (id: number): Promise<Course | null> => {
        return await Course.findByPk(id);
    }

    /**
     * get course info by code
     * @param {string} code 
     * @returns 
     */
    public getCourseByCode = async (code: string) : Promise<Course | null> => {
        return await Course.findOne({
            where: {
                code: code,
            }
        }) 
    }

    /**
     * Check wonder if code and Id equal or not
     * @param {number} courseId 
     * @param {string} code 
     * @returns 
     */
    public isMatchCodeAndId = async (courseId: number, code: string): Promise<boolean> => {
        const course = await Course.findOne({
            where: {
                id: courseId,
                code: code,
            }
        });
        if (course) return true;
        return false;
    }

    public getCodeById = async (courseId: number): Promise<string | undefined> => {
        const course =  await this.getCourseDetail(courseId);
        return course?.code;
    }
}