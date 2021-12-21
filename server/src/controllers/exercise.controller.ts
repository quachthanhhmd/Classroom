import { inject, injectable } from "inversify";
import {
    serializeDeadlineList,
    serializeExerciseDetail,
    serializeExerciseList, serializeExerciseThumbnail, IAuthorizeRequest, ICreateExercise, IResponse
} from "../interfaces";
import { NotificationType, ReferenceType, SubmissionType } from "../models";
import {
    AttachmentService, CommentService,
    ExerciseService, MemberService, NotificationService, SubmissionService, TopicService
} from "../services";
import { newExerciseMessage, uriNewExercise } from "./../constants/notify.constant";

@injectable()
export class ExerciseController {
    constructor(
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("TopicService") private readonly _topicService: TopicService,
        @inject("CommentService") private readonly _commentService: CommentService,
        @inject("AttachmentService") private readonly _attachmentService: AttachmentService,
        @inject("SubmissionService") private readonly _submissionService: SubmissionService,
        @inject("NotificationService") private readonly _notificationService: NotificationService
    ) { }

    public getAllExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;

            const exerciseList = await this._exerciseService.findAllExerciseByCourseId(courseId);
            // const topicList = await this._topicService.findTopicByCourseId(courseId);

            return res.composer.success(serializeExerciseList(exerciseList));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public getDeadlineList = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const courseId = +req.params.courseId;

            const exerciseList = await this._exerciseService.findAfterDate(courseId, new Date());

            if (exerciseList.length === 0) {
                return res.composer.success();
            }

            const exerciseIdList: number[] = exerciseList.map((exercise) => {
                return exercise.id;
            });

            const submissionList = await this._submissionService.findSubmissionByExerciseId(userId, exerciseIdList);

            const newExerciseList = exerciseList.filter((exercise) => {
                if (submissionList.some((submission) => submission.exerciseId === exercise.id)) {
                    return false;
                }

                return true;
            });

            return res.composer.success(serializeDeadlineList(newExerciseList));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public getOneExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const postId = +req.params.postId;

            const exercise = await this._exerciseService.findAllInfoById(+postId);
            if (!exercise) {
                return res.composer.notFound();
            }

            const commentList = await this._commentService.findCommentByRefType(ReferenceType.EXERCISE, exercise.id);
            const attachmentList = await this._attachmentService.findAllAttachment(ReferenceType.EXERCISE, exercise.id);

            return res.composer.success(serializeExerciseDetail({ ...exercise, commentList, attachmentList }));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public createNewExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const userId = <number> req.currentUser?.id;

            const bodyExercise = req.body;

            let topicId = -1;
            if (bodyExercise.topic.id === -1) {
                const newTopic = await this._topicService.createTopic(courseId, { topic: bodyExercise.topic.topic });

                if (newTopic) {
                    topicId = newTopic.id;
                }
            }

            if (topicId === -1 && bodyExercise.topic.id !== -1) {
                const topic = await this._topicService.findTopicById(bodyExercise.topic.id);

                if (!topic) { return res.composer.badRequest(); }
                topicId = topic.id;
            }

            delete bodyExercise.topic;

            const newExercise =
                await this._exerciseService.createExercise(userId, courseId, { ...bodyExercise, topicId });

            if (!newExercise) { return res.composer.internalServerError(); }

            await this._notificationService.createNewNotification(courseId, {
                content: newExerciseMessage(`${req.currentUser?.firstName} ${req.currentUser?.lastName}`),
                uri: uriNewExercise(courseId, newExercise.id),
                refType: NotificationType.COURSE,
                refId: courseId
            });

            return res.composer.success(serializeExerciseThumbnail(newExercise));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public updateExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const body: ICreateExercise = req.body;
            const id = +req.params.id;
            const courseId = +req.params.id;
            const userId = <number> req.currentUser?.id;

            const isPermitToCRUD = await this._memberService.isPermitToCRUD(courseId, userId);

            if (!isPermitToCRUD) { return res.composer.forbidden(); }

            await this._exerciseService.updateExercise(id, body);

            const updateExercise = await this._exerciseService.findExerciseById(id);
            if (!updateExercise) { return res.composer.notFound(); }

            if (body.hasOwnProperty("state")) {
                const submissionList = await this._submissionService.findAllSubmissionExercise(id);
                await Promise.all(submissionList.map(async (submission) => {
                    await this._submissionService.updateSubmission(submission.id, {type: SubmissionType.COMPLETED})
                }))
            }

            return res.composer.success(serializeExerciseDetail(updateExercise));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public deleteExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const id = +req.params.id;
            const courseId = +req.params.id;
            const userId = <number> req.currentUser?.id;

            const isPermitToCRUD = await this._memberService.isPermitToCRUD(courseId, userId);

            if (!isPermitToCRUD) { return res.composer.forbidden(); }

            await this._exerciseService.deleteExercise(id);

            const updateExercise = await this._exerciseService.findExerciseById(id);
            if (!updateExercise) { return res.composer.notFound(); }

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public exportGradeInExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            console.log(12439273491273);
            const courseId = +req.params.courseId;
            const exerciseId = +req.params.exerciseId;
            console.log(courseId, exerciseId);
            const excelUrl = await this._exerciseService.exportGradeInExercise(exerciseId, courseId);

            if (excelUrl === null) { return res.composer.badRequest(); }

            return res.composer.success(excelUrl);
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public uploadGradeFromSheet = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const exerciseId = +req.params.exerciseId;
            const { url } = req.body;

            const gradeData = await this._exerciseService.importGradeInExercise(exerciseId, url);

            return res.composer.success(gradeData);
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}
