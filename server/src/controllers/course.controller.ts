import { inject, injectable } from "inversify";
import "reflect-metadata";
import { MEMBERSTATE, TYPEROLE } from "../constants";
import { Exercise, ExerciseState, Feed } from "../models";
import {
    CommentService,
    CourseService, ExerciseService, ExerciseTypeService, FeedService, MemberService, SubmissionService, TokenService, UserService
} from "../services";
import { serializeCourseDetail, serializeFeedDetailList, serializeStudentList, IAuthorizeRequest, IResponse } from "./../interfaces";
import { ICreateCourse } from "./../interfaces/course.interface";
import { serializeExerciseTypeDetailList } from "./../interfaces/exercise-type.interface";

@injectable()
export class CourseController {

    constructor(
        @inject("CourseService") private readonly _courseService: CourseService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("UserService") private readonly _userService: UserService,
        @inject("TokenService") private readonly _tokenService: TokenService,
        @inject("FeedService") private readonly _feedService: FeedService,
        @inject("CommentService") private readonly _commentService: CommentService,
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService,
        @inject("SubmissionService") private readonly _submissionService: SubmissionService,
        @inject("ExerciseTypeService") private readonly _exerciseTypeService: ExerciseTypeService
    ) { }

    public addCourse = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseBody: ICreateCourse = req.body;
            const userId = req.currentUser?.id;
            const newClass = await this._courseService.createCourse(<number> userId, courseBody);

            return res.composer.success(serializeCourseDetail(newClass));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public getCourseDetail = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseId: number = +req.params.courseId;

            const course = await this._courseService.getCourseDetail(courseId);

            if (!course) {
                return res.composer.notFound();
            }

            return res.composer.success(serializeCourseDetail(course));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public joinCourseByCode = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const code = req.params.code;
            const userId = req.currentUser?.id;

            const course = await this._courseService.getCourseByCode(code);
            if (!course) {
                return res.composer.notFound();
            }

            await this._memberService.upsetMember(<number> userId, course.id, MEMBERSTATE.ACCEPT, TYPEROLE.STUDENT);

            return res.composer.success(serializeCourseDetail(course));
        } catch (err) {
            res.composer.otherException(err);
        }
    }

    public joinCourseByUrl = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const code = req.query.give;
            const courseId = req.params.courseId;
            const userId = req.currentUser?.id;

            const isMatchCodeAndId = this._courseService.isMatchCodeAndId(+courseId, String(code));

            if (!isMatchCodeAndId) {
                return res.composer.notFound();
            }

            await this._memberService.upsetMember(<number> userId, +courseId, MEMBERSTATE.ACCEPT, TYPEROLE.STUDENT);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public checkJoinCourseToken = async (
        req: IAuthorizeRequest,
        res: IResponse
    ) => {
        try {
            const { token, role } = req.query;
            const courseId = +req.params.courseId;
            const userId = req.currentUser?.id;

            const member = await this._memberService.findMemberByUserAndCourseId(<number> userId, courseId);

            if (!member || member.type === MEMBERSTATE.REJECT || member.type === MEMBERSTATE.BLOCKED) {
                return res.composer.badRequest();
            }

            if (member.type === MEMBERSTATE.ACCEPT) {
                return res.composer.success();
            }

            const isMatchToken = await this._tokenService.isMatchTokenIdInvite(<string> token, <number> userId);

            if (!isMatchToken) {
                return res.composer.forbidden();
            }

            await this._memberService.updateMember(<number> userId, +courseId, MEMBERSTATE.ACCEPT, String(role));

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public updateCourseInfo = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const courseId = +req.params.courseId;
            const body = req.body;

            const isOwnCourse = await this._courseService.isOwnCourse(courseId, userId);
            if (!isOwnCourse) { return res.composer.forbidden(); }

            await this._courseService.updateCourse(courseId, body);
            const newCourse = await this._courseService.getCourseDetail(courseId);

            return res.composer.success(serializeCourseDetail(newCourse));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public getAllPost = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;

            // get all post, exercise post more

            const course = await this._courseService.getAllPost(courseId);

            if (!course) { return res.composer.notFound(); }

            // const feedList = standardizedObjectArr<Feed>(course.feedList);

            // // const feedCommentList = await this._commentService.findCommentByRefType(ReferenceType.FEED, fe)

            // const exerciseList = standardizedObjectArr<Exercise>(course.exerciseList);

            const feedList = await this._feedService.getAllFeedInCourse(courseId);
            const exerciseList = await this._exerciseService.getAllExerciseInCourse(courseId);

            const postList: (Exercise | Feed)[] =
                [...feedList, ...exerciseList].sort(
                    (a, b) =>
                        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
                );

            return res.composer.success(serializeFeedDetailList(postList));
        } catch (err) {
            console.log(err);
            res.composer.otherException(err);
        }
    }

    public exportGrade = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;

            const urlGradeBoard = await this._courseService.exportGradeBoard(courseId);
            if (urlGradeBoard === null) return res.composer.badRequest();

            return res.composer.success(urlGradeBoard);
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public getAllOAuthMember = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const data = await this._memberService.findAllStudentAuth(courseId);

            const studentTotalGrade = await this._courseService.calculateTotalGrade(courseId);
            const gradeList = await this._courseService.calculateTotalGrade(courseId);

            return res.composer.success(serializeStudentList(data, gradeList));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public getGradeStudent = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const courseId = +req.params.courseId;

            const exerciseList = await this._exerciseService.findAllExerciseByCourseId(courseId);
            const exerciseTypeList = await this._exerciseTypeService.findAllExerciseDetail(courseId);
            const totalMaxScore = exerciseTypeList.reduce((a, b) => a + b.grade, 0);
            const scoreList = await Promise.all(exerciseList.map(async (exercise) => {
                const exerciseType = exerciseTypeList.filter((item) => item.id === exercise.typeId);
                const typeName = `${exerciseType[0].name} - ${exerciseType[0].grade} điểm`;

                const initResponse = {
                    id: exercise.id,
                    score: 0,
                    typeId: exercise.typeId,
                    submissionId: null,
                    title: exercise.title,
                    typeName
                }

                if (exercise.state === ExerciseState.SPENDING) return initResponse;

                const submission = await this._submissionService.findByUserId(userId, exercise.id);

                if (submission) {
                    return {
                        id: exercise.id,
                        title: exercise.title,
                        submissionId: submission.id,
                        score: submission.score,
                        typeId: exercise.typeId,
                        typeName
                    }
                }

                return initResponse;
            }))

            const typeTotalScoreList = exerciseTypeList.map((item) => {
                let countGradeType = 0;

                const totalScoreType = scoreList.reduce((a, b) => {
                    if (b.typeId === item.id && b.submissionId !== null) {
                        countGradeType++;

                        return a + b.score;
                    }

                    return a;
                }, 0);

                return {
                    id: item.id,
                    totalScoreType:
                        totalScoreType === 0 || countGradeType === 0 ? 0 :
                            totalScoreType * item.grade / (countGradeType * 10),
                    maxScore: item.grade,
                }
            })

            const totalScore = typeTotalScoreList.reduce((a, b) => a + b.totalScoreType, 0);

            return res.composer.success({
                totalScore,
                totalMaxScore,
                scoreList: scoreList.filter((score) => score.submissionId !== null)
            })
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public getExerciseType = async (
        req: IAuthorizeRequest, res: IResponse
    ): Promise<void> => {
        try {
            const courseId = req.params.courseId;

            const exerciseTypeList = await this._exerciseTypeService.findAllExerciseTypeByCourseId(+courseId);

            return res.composer.success(serializeExerciseTypeDetailList(exerciseTypeList));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}
