import { inject, injectable } from "inversify";
import "reflect-metadata";
import { col, Op } from "sequelize";
import { MEMBERSTATE, TYPEROLE } from "../constants";
import { ICreateCourse } from "../interfaces";
import { Course, ExerciseType } from "../models";
import { MemberService } from "./";
import { IUpdateCourse } from "./../interfaces/course.interface";

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
        return Course.findOne({
            where: {
                id
            },
            raw: false,
        });
    }

    /**
     * get course info by code
     * @param {string} code 
     * @returns 
     */
    public getCourseByCode = async (code: string): Promise<Course | null> => {
        return Course.findOne({
            where: {
                code,
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
                code,
            }
        });
        if (course) return true;

        return false;
    }

    /**
     * Get code of course by Id
     * @param {number} courseId 
     * @returns 
     */
    public getCodeById = async (courseId: number): Promise<string | undefined> => {
        const course = await this.getCourseDetail(courseId);

        return course?.code;
    }
    /**
     * Check wonder if course is own user or not
     * @param {number} courseId 
     * @param {number} userId 
     * @returns 
     */
    public isOwnCourse = async (courseId: number, userId: number): Promise<boolean> => {
        const course = await Course.findOne({
            where: {
                [Op.and]: {
                    id: courseId,
                    ownerId: userId,
                }
            }
        })

        return course ? true : false;
    }

    /**
     * Update information of course
     * @param {number} courseId 
     * @param {IUpdateCourse} body 
     * @returns 
     */
    public updateCourse = async (courseId: number, body: IUpdateCourse) => {
        return Course.update(
            body,
            {
                where: {
                    id: courseId,
                },
                returning: true,
            }
        )
    }
}