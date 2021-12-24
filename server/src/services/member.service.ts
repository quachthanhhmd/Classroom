import { Course } from "./../models/course.model";
import { Submission } from "./../models/submission.model";

import { injectable } from "inversify";
import "reflect-metadata";
import { Op } from "sequelize";
import { MEMBERSTATE } from "../constants";
import { Exercise, Member, User } from "../models";
import { getDataFromExcelUrl } from "../utils/excel";
import { StudentType, TYPEROLE } from "./../constants/role.constant";

@injectable()
export class MemberService {
    /**
     * 
     * @param {number} userId 
     * @param {number} courseId 
     * @returns 
     */
    public isExistMember = async (userId: number, courseId: number) => {
        const member = await this.findMemberByUserAndCourseId(userId, courseId);

        return member && member.type === MEMBERSTATE.ACCEPT ? true : false;
    }

    /**
     * 
     * @param studentId 
     * @returns 
     */
    public findMemberByStudentId = async (studentId: string) => {

        return Member.findOne({
            where: {
                [Op.and]: {
                    studentId,
                    type: MEMBERSTATE.ACCEPT
                }
            }
        })
    }

    /**
     * 
     * @param courseId 
     * @returns 
     */
    public findAllStudentInCourse = async (courseId: number) => {

        return Member.findAll({
            where: {
                [Op.and]: {
                    courseId,
                    role: TYPEROLE.STUDENT,
                    type: MEMBERSTATE.ACCEPT
                }
            },
            attributes: ["id", "studentId", "userId"],
        });
    }

    public findAllStudentAuthSummary = async (courseId: number) => {
        return Member.findAll({
            where: {
                [Op.and]: {
                    courseId,
                    role: TYPEROLE.STUDENT,
                    type: MEMBERSTATE.ACCEPT,
                    authType: StudentType.AUTH
                }
            },
        })
    }
    public findAllStudentAuth = async (courseId: number) => {

        return Member.findAll({
            where: {
                [Op.and]: {
                    courseId,
                    role: TYPEROLE.STUDENT,
                    type: MEMBERSTATE.ACCEPT,
                    authType: StudentType.AUTH
                }
            },
            include: [
                {
                    model: User,
                    attributes: ["firstName", "lastName", "id", "avatarUrl", "email"],
                },
                {
                    model: Course,
                    include: [
                        {
                            model: Exercise,
                            include: [{
                                model: Submission
                            }]
                        }
                    ]
                }
            ],
            raw: false,
            nest: true,
        })
    }

    /**
     * 
     * @param courseId 
     * @param role 
     * @returns 
     */
    public findAllMemberByRole = async (courseId: number, role: string) => {
        return Member.findAll({
            where: {
                [Op.and]: {
                    courseId,
                    role,
                    type: MEMBERSTATE.ACCEPT
                }
            },
            raw: false,
            nest: true,
        });
    }

    /**
     * Check wonder member is belong to course or not
     * @param {number} userId 
     * @param {number} courseId 
     * @returns 
     */
    public isActiveMember = async (userId: number, courseId: number): Promise<boolean> => {
        const member = await this.findMemberByUserAndCourseId(userId, courseId);
        if (!member) { return false; }

        if (member.type === MEMBERSTATE.ACCEPT) { return true; }

        return false;
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
        });
    }

    /**
     * Find user's type
     * @param {number} userId 
     * @param {number} courseId 
     * @returns {Promise<string | null>}
     */
    public findMemberState = async (userId: number, courseId: number): Promise<string | null> => {
        const member = await this.findMemberByUserAndCourseId(userId, courseId);

        if (!member) { return null; }

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
        });
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
        });
    }

    /**
     * 
     * @param userId 
     * @param courseId 
     * @param state 
     * @param role 
     * @returns 
     */
    public updateMember = async (userId: number, courseId: number, state?: string, role?: string) => {
        const newBody = JSON.parse(JSON.stringify({ type: state, role }));

        return Member.update(
            newBody,
            {
                where: {
                    [Op.and]: {
                        userId,
                        courseId,
                    }
                }
            });
    }

    public updateAuthMember = async (studentId: string, courseId: number, authType = StudentType.AUTH) => {
        return Member.update(
            { authType },
            {
                where: {
                    [Op.and]: {
                        studentId,
                        courseId,
                    }
                }
            }
        )
    }

    /**
     * Add id for student if member is student
     * @param {number} userId 
     * @param {number} courseId 
     * @param {string} studentId 
     */
    public upsertStudentId = async (id: number, userId: number, courseId: number, studentId: string): Promise<void> => {
        await Member.upsert({
            id,
            userId,
            courseId,
            studentId,
            type: MEMBERSTATE.ACCEPT
        });
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
        });

        if (!student) { return false; }

        return true;
    }

    /**
     * Check wonder studentId exist in course or not
     * @param {number} courseId 
     * @param {string} studentId 
     * @returns 
     */
    public isExistStudentId = async (courseId: number, studentId: string): Promise<boolean> => {
        const student = await Member.findOne({
            where: {
                courseId,
                studentId
            }
        });

        return !!student;
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
                    type: MEMBERSTATE.ACCEPT
                }
            }
        });
    }

    /**
     * Check if user is student role or not
     * @param {number} userId 
     * @param {number} courseId 
     * @returns {Promise<Member | null>}
     */
    public getRole = async (userId: number, courseId: number): Promise<Member | null> => {
        return Member.findOne({
            attributes: ["role", "type", "studentId"],
            where: {
                [Op.and]: {
                    userId,
                    courseId,
                }
            }
        });
    }
    /**
     * get ALl summary info member in course 
     * @param courseId 
     * @returns 
     */
    public getAllSummaryMember = async (courseId: number, authType?: string) => {
        const data = JSON.parse(JSON.stringify({ authType }));

        return Member.findAll({
            attributes: ["id", "studentId", "type", "role"],
            where: {
                courseId,
                type: MEMBERSTATE.ACCEPT,
                ...data
            },
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "id", "avatarUrl", "email"],
            }],
            raw: false,
            nest: true,
        });
    }
    /**
     * 
     * @param {number} userId 
     * @param {number} ourseId 
     * @returns 
     */
    public isSpendingInvite = async (userId: number, courseId: number) => {
        const member = await Member.findOne({
            where: {
                [Op.and]: {
                    userId,
                    courseId,
                    type: MEMBERSTATE.SPENDING
                }
            }
        });

        return member ? true : false;
    }

    /**
     * Check wonder user permits to CRUD or not
     * @param courseId 
     * @param userId 
     * @returns 
     */
    public isPermitToCRUD = async (courseId: number, userId: number): Promise<boolean> => {

        const member = await Member.findOne({
            where: {
                [Op.and]: {
                    userId,
                    courseId,
                    role: {
                        [Op.ne]: TYPEROLE.STUDENT
                    }
                }
            }
        });

        return !!member;
    }

    public importAuthMember = async (url: string, courseId: number) => {
        const dataset = await getDataFromExcelUrl(url);

        const dataSheet: any[] = dataset.data[0].data;
        if (dataSheet.length === 0 ||
            !dataSheet[0].hasOwnProperty("MSSV") || !dataSheet[0].hasOwnProperty("Họ và tên")) { return false; }

        await Promise.all(dataSheet.map(async (data) => {
            await this.updateAuthMember(data.MSSV, courseId);
        }))

        return true;
    }

}
