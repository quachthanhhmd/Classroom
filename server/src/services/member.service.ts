
import { injectable } from "inversify";
import "reflect-metadata";
import { Op } from "sequelize";
import { MEMBERSTATE } from "../constants";
import { Member, User } from "../models";
import { TYPEROLE } from "./../constants/role.constant";

@injectable()
export class MemberService {
    public isExistMember = async (userId: number, courseId: number) => {
        const member = await this.findMemberByUserAndCourseId(userId, courseId);

        return member ? true : false;
    }
    /**
     * Find member by UserId and CourseId.
     * @param {number} userId 
     * @param {number} courseId 
     * @returns {Promise<Member | null>}
     */
    public findMemberByUserAndCourseId = async (userId: number, courseId: number): Promise<Member | null> => {
        return Member.findOne({
            where: {
                [Op.and]: {
                    userId,
                    courseId,
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
    public addMember = async (
        userId: number, courseId: number, role = TYPEROLE.STUDENT, state = MEMBERSTATE.SPENDING) => {
        return Member.create({
            userId,
            courseId,
            role,
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
    public upsetMember = async (userId: number, courseId: number, state?: string, role?: string) => {

         await Member.upsert({
            userId,
            courseId,
            role,
            type: state,
        })
    }

    public updateMember = async (userId: number, courseId: number, state?: string, role?: string) => {
        const newBody = JSON.parse(JSON.stringify({ type: state, role }));
        console.log(newBody);

        return Member.update(
            newBody,
            {
                where: {
                    [Op.and]: {
                        userId,
                        courseId,
                    }
                }
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
            studentId
        }, {
            where: {
                [Op.and]: {
                    userId,
                    courseId,
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
                    userId,
                    courseId,
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
        return Member.findOne({
            attributes: ["role", "type", "studentId"],
            where: {
                [Op.and]: {
                    userId,
                    courseId,
                }
            }
        })
    }
    /**
     * get ALl summary info member in course 
     * @param courseId 
     * @returns 
     */
    public getAllSummaryMember = async (courseId: number) => {
        return Member.findAll({
            attributes: ["id", "studentId", "type", "role"],
            where: {
                courseId,
                type: MEMBERSTATE.ACCEPT
            },
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "id", "avatarUrl", "email"],
            }],
            raw: false,
            nest: true,
        })
    }

    public isSpendingInvite = async (userId: number, courseId: number) => {
        const member = await Member.findOne({
            where: {
                [Op.and]: {
                    userId,
                    courseId,
                    type: MEMBERSTATE.SPENDING
                }
            }
        })

        return member ? true : false;
    }
}