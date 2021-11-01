import "reflect-metadata";
import { Member } from "../models";
export declare class MemberService {
    constructor();
    /**
     * Find member by UserId and CourseId.
     * @param {number} userId
     * @param {number} courseId
     * @returns {Promise<Member | null>}
     */
    findMemberByUserAndCourseId: (userId: number, courseId: number) => Promise<Member | null>;
    /**
     * Find user's type
     * @param {number} userId
     * @param {number} courseId
     * @returns {Promise<string | null>}
     */
    findMemberState: (userId: number, courseId: number) => Promise<string | null>;
    /**
     * Add new member
     * @param {number} userId
     * @param {number} courseId
     * @param {string} role
     * @param {string} state
     * @returns
     */
    addMember: (userId: number, courseId: number, role?: string, state?: string) => Promise<Member>;
    /**
     * Update or create member
     * @param {number} userId
     * @param {number} courseId
     * @param {string} role
     * @param {string} state
     * @returns
     */
    upsetMember: (userId: number, courseId: number, state?: string, role?: string) => Promise<[Member, boolean | null]>;
}
