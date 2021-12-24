import { inject, injectable } from "inversify";
import moment from "moment";
import * as excel from "node-excel-export";
import "reflect-metadata";
import { Op } from "sequelize";
import { MEMBERSTATE, StudentType, TYPEROLE } from "../constants";
import { ICreateCourse } from "../interfaces";
import { Course, Exercise, Feed, Member, Submission, Topic, User } from "../models";
import { getSpecification } from "../utils/excel";
import { uploadNewFileFromBuffer } from "../utils/firebase";
import { ExerciseService, FeedService, MemberService } from "./";
import { IUpdateCourse } from "./../interfaces/course.interface";
import { SubmissionService } from "./submission.service";

@injectable()
export class CourseService {

    constructor(
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("FeedService") private readonly _feedService: FeedService,
        @inject("SubmissionService") private readonly _submissionService: SubmissionService,
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService) { }

    /**
     * Create a new class.
     * @param id 
     * @param courseBody 
     * @returns 
     */
    public createCourse = async (ownerId: number, courseBody: ICreateCourse): Promise<Course> => {
        const newCourse = await Course.create({
            ...courseBody,
            ownerId
        });

        await this._memberService.addMember(ownerId, newCourse.id, TYPEROLE.TEACHER, MEMBERSTATE.ACCEPT);

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
            include: [{
                model: Topic,
                order: [["createdAt", "ASC"]]
            }],
            raw: false,
            nest: true,
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
            },
            raw: true,
        });
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
            },
            raw: true
        });
        if (course) { return true; }

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

    public getOwnerId = async (courseId: number) : Promise<number | null> => {
        console.log("course ne", courseId);
        const course = await Course.findOne({
            where: {
                id: courseId
            },
            raw: false,
            nest: true,
        });
        console.log(course);
        if (!course) return null;

        return course.ownerId;
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
            },
            raw: true,
        });

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

            }
        );
    }

    public getAllPost = async (courseId: number) => {
        return Course.findOne({
            attributes: ["id"],
            where: {
                id: courseId,
            },
            include: [
                {
                    model: Feed,
                    order: [["createdAt", "ASC"]],
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["avatarUrl", "firstName", "lastName"],
                        }
                    ],

                },
                {
                    model: Exercise,
                    order: [["createdAt", "ASC"]],

                }
            ],
            raw: false,
            nest: true,
        });
    }

    public exportGradeBoard = async (courseId: number) => {
        const studentList = await this._memberService.findAllStudentInCourse(courseId);

        if (studentList.length === 0) { return null }

        const exerciseList = await this._exerciseService.findAllExerciseSubmissionByCourseId(courseId);

        const totalExercises = exerciseList.length;

        const dataset = studentList.map((student) => {

            const submissionList = exerciseList.map((exercise) => {

                if (typeof exercise.submissionList === "object") {

                    if (exercise.submissionList.userId === null) {
                        return {
                            score: 0,
                            studentId: student.studentId,
                        }
                    }
                    exercise.submissionList = [exercise.submissionList];
                }

                const submissionStudent =
                    exercise.submissionList.filter((submission) => submission.userId === student.userId)

                const dataSubmission = <any> {
                    score: 0,
                    studentId: student.studentId,
                }
                if (submissionStudent.length > 0) {
                    dataSubmission.score = submissionStudent[0].score;
                }

                return dataSubmission;
            })

            const totalScore = submissionList.reduce((a, b) => a + b.score, 0) / totalExercises;

            return {
                studentId: student.studentId,
                score: totalScore,
            }
        })

        const fileName = `${moment(
            new Date()
        ).utc()}-export-grade-broad.xlsx`;

        const specification = {
            studentId: getSpecification("MSSV", 180),
            score: getSpecification("Điểm số", 70),
        };

        const report = excel.buildExport([
            {
                specification,
                name: `Bảng điểm của khóa học`,
                data: dataset,
            },
        ]);

        const result = await uploadNewFileFromBuffer(report, {
            fileName,
            pathFile: `course-grade-board-${courseId}`,
        });

        return result.url;
    }

    public calculateTotalGrade = async (courseId: number) => {
        const memberAuthList = await this._memberService.findAllStudentAuthSummary(courseId);
        const countExercise = (await this._exerciseService.findAllExerciseByCourseId(courseId)).length;

        if (countExercise === 0) return [];
        const gradeList = await Promise.all(memberAuthList.map(async (member) => {

            const exerciseList = await this._exerciseService.findAllSubmissionOfUserInCourse(courseId, member.userId);
            const totalScore = exerciseList.map((exercise) => {
                if (!exercise?.submissionList || exercise?.submissionList.length === 0) return 0;

                return exercise.submissionList[0].score;
            })

            return {
                id: member.id,
                totalScore: totalScore.reduce((a, b) => a + b, 0) / countExercise,
            }
        }))

        return gradeList;
    }
}
