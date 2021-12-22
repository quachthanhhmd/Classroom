import { inject, injectable } from "inversify";
import moment from "moment";
import * as excel from "node-excel-export";
import "reflect-metadata";
import { Op } from "sequelize";
import { CommentService, MemberService, SubmissionService } from ".";
import { Exercise, ExerciseType, ReferenceType, Submission, Topic, User } from "../models";
import { getDataFromExcelUrl, getSpecification } from "../utils/excel";
import { uploadNewFileFromBuffer } from "../utils/firebase";
import { ICreateExercise, IUpdateExercise } from "./../interfaces";

@injectable()
export class ExerciseService {
    constructor(
        @inject("CommentService") private readonly _commentService: CommentService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("SubmissionService") private readonly _submissionService: SubmissionService
    ) {

    }
    /**
     * Find one exercise by id
     * @param id 
     * @returns 
     */
    public findExerciseById = async (id: number) => {
        return Exercise.findByPk(id);
    }

    /**
     * 
     * @param courseId 
     * @param userId 
     * @param date 
     * @returns 
     */
    public findAfterDate = async (courseId: number, date: Date) => {
        const standard = moment(date).format("YYYY-MM-DD hh:mm:ss");

        return Exercise.findAll({
            where: {
                [Op.and]: {
                    courseId,
                    deadline: {
                        [Op.gte]: standard
                    }
                }
            }
        });
    }

    /**
     * 
     * @param courseId 
     * @returns 
     */
    public findAllExerciseSubmissionByCourseId = async (courseId: number): Promise<any[]> => {
        return Exercise.findAll({
            where: {
                courseId
            },
            attributes: ["id", "title"],
            include: [{
                model: Submission,
                attributes: ["userId", "score"]
            }],
            raw: true,
            nest: true,
        })
    }
    /**
     * 
     * @param courseId 
     * @returns 
     */
    public getAllExerciseInCourse = async (courseId: number): Promise<any[]> => {
        const exerciseList = await Exercise.findAll({
            where: {
                courseId
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "avatarUrl", "firstName", "lastName"],
                }
            ],
            order: [["createdAt", "DESC"]],
            raw: true,
            nest: true,
        });

        return Promise.all(exerciseList.map(async (feed) => {
            const allComment = await this._commentService.findCommentByRefType(ReferenceType.EXERCISE, feed.id);

            return { ...feed, commentList: allComment };
        }));
    }

    public findAllInfoById = async (id: number) => {
        return Exercise.findOne({
            where: { id },
            include: [
                {
                    model: Topic,
                    attributes: ["id", "topic"]
                },
                {
                    model: ExerciseType,
                    attributes: ["id", "name"],
                },
                {
                    model: User,
                }
            ],
            raw: true,
            nest: true,
        });
    }

    /**
     * Find All exercise by courseId
     * @param courseId 
     * @returns 
     */
    public findAllExerciseByCourseId = async (courseId: number): Promise<Exercise[]> => {
        return Exercise.findAll({
            where: {
                courseId
            },
            order: [["createdAt", "ASC"]],
            raw: true,
            nest: false
        });
    }
    /**
     * Create new Exercise
     * @param topicId 
     * @param courseId 
     * @param body 
     * @returns 
     */
    public createExercise = async (ownerId: number, courseId: number, body: ICreateExercise) => {
        return Exercise.create({
            ownerId,
            courseId,
            ...body
        });
    }

    /**
     * Update information of exercise   
     * @param id 
     * @param body 
     * @returns 
     */
    public updateExercise = async (id: number, body: IUpdateExercise) => {
        return Exercise.update(
            body,
            {
                where: {
                    id,
                }
            }
        );
    }
    /**
     * Delete Exercise
     * @param id 
     */
    public deleteExercise = async (id: number): Promise<number> => {
        return Exercise.destroy({
            where: {
                id
            }
        });
    }

    /**
     * 
     * @param exerciseId 
     * @param courseId 
     * @returns 
     */
    public exportGradeInExercise = async (exerciseId: number, courseId: number): Promise<null | string> => {

        const studentList = await this._memberService.findAllStudentInCourse(courseId);
        const exercise = await this.findExerciseById(exerciseId);

        if (!exercise) { return null; }

        if (studentList.length === 0) { return null; }

        const studentGradeList = await this._submissionService.findAllScoreInExercise(exerciseId);
        if (studentGradeList.length === 0) { return null; }

        const fileName = `${moment(
            new Date()
        ).utc()}-export-student-grade-exercise.xlsx`;

        const dataset = studentList.map((student) => {

            const submissionGrade = studentGradeList.filter((submission) => submission.userId === student.userId);

            const data = {
                studentId: student.studentId,
                name: exercise.title,
                score: ""
            };

            if (submissionGrade.length !== 0) {
                data.score = String(submissionGrade[0].score);
            }

            return data;
        });

        const specification = {
            name: getSpecification("Tên bài tập", 180),
            studentId: getSpecification("MSSV", 180),
            score: getSpecification("Điểm số", 70),
        };

        const report = excel.buildExport([
            {
                specification,
                name: `Điểm số bài tập ${exercise.title}`,
                data: dataset,
            },
        ]);

        const result = await uploadNewFileFromBuffer(report, {
            fileName,
            pathFile: `course-grade-${courseId}-exercise-${exerciseId}`,
        });

        return result.url;
    }

    public importGradeInExercise = async (exerciseId: number, url: string) => {

        const dataset = await getDataFromExcelUrl(url);

        const dataGrade = await Promise.all(dataset.data[0].data.map(async (student: any) => {
            const member = await this._memberService.findMemberByStudentId(student.MSSV);
            if (!member) return;

            const submission = await this._submissionService.findByUserId(member.userId, exerciseId);

            if (submission)  {
                await this._submissionService.updateSubmission(submission.id, {score: student["Điểm số"]});
            }
            else
                await this._submissionService.createSubmission(exerciseId, member.userId, student["Điểm số"]);

            return {
                userId: member.userId,
                score: student["Điểm số"]
            }
        }))

        return {
            exerciseId,
            dataGrade
        }
    }
}
