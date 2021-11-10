
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Op } from "sequelize";

import { Member } from "../models";
import { MEMBERSTATE } from "../constants";
import { TYPEROLE } from './../constants/role.constant';

@injectable()
export class MemberService {
    constructor() { }

    /**
     * Find member by UserId and CourseId.
     * @param {number} userId 
     * @param {number} courseId 
     * @returns {Promise<Member | null>}
     */
    public findMemberByUserAndCourseId = async (userId: number, courseId: number): Promise<Member | null> => {
        return await Member.findOne({
            where: {
                [Op.and]: {
                    userId: userId,
                    courseId: courseId,
                }
            }
        })
    }

    /**
     * Find user's type
     * @param {number} userId 
     * @param {number} courseId 
     * @returns {Promise<string | null>}
     */
    public findMemberState = async (userId: number, courseId: number): Promise<string | null> => {
        const member = await this.findMemberByUserAndCourseId(userId, courseId);

        if (!member) return null;

        return member.type;
    }

    /**
     * Add new member 
     * @param {number} userId 
     * @param {number} courseId 
     * @param {string} role 
     * @param {string} state 
     * @returns 
     */
    public addMember = async (userId: number, courseId: number, role = TYPEROLE.STUDENT, state = MEMBERSTATE.SPENDING) => {
        return await Member.create({
            userId: userId,
            courseId: courseId,
            role: role,
            type: state,
        })
    }

    /**
     * Update or create member 
     * @param {number} userId 
     * @param {number} courseId 
     * @param {string} role 
     * @param {string} state 
     * @returns 
     */
    public upsetMember = async (userId: number, courseId: number, state = MEMBERSTATE.SPENDING, role = TYPEROLE.STUDENT) => {
        return await Member.upsert({
            userId: userId,
            courseId: courseId,
            role: role,
            type: state,
        })
    }
    /**
     * Add id for student if member is student
     * @param {number} userId 
     * @param {number} courseId 
     * @param {string} studentId 
     */
    public AddStudentId = async (userId: number, courseId: number, studentId: string): Promise<void> => {
        await Member.update({
            studentId: studentId
        }, {
            where: {
                [Op.and]: {
                    userId: userId,
                    courseId: courseId,
                }
            }
        })
    }

    /**
     * Check if user is student role or not
     * @param {number} userId 
     * @param {number} courseId 
     * @returns {Promise<Member | null>}
     */
    public isStudentRole = async (userId: number, courseId: number): Promise<boolean> => {
        const student = await Member.findOne({
            where: {
                [Op.and]: {
                    userId: userId,
                    courseId: courseId,
                    role: TYPEROLE.STUDENT
                }
            }
        })

        if (!student) return false;
        return true;
    }

    /**
     * Check if user is student role or not
     * @param {number} userId 
     * @param {number} courseId 
     * @returns {Promise<Member | null>}
     */
    public getRoleMember = async (userId: number, courseId: number): Promise<Member | null> => {
        return await Member.findOne({
            attributes: ["role", "type", "studentId"],
            where: {
                [Op.and]: {
                    userId: userId,
                    courseId: courseId,

                }
            }
        })

    }
}