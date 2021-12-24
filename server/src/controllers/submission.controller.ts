import { inject, injectable } from "inversify";
import { reviewGradeMessage, uriReviewGrade, UpdateScore } from "../constants";
import { serializeSubmissionList, IAuthorizeRequest, IResponse } from "../interfaces";
import { ExerciseType, NotificationType, ReferenceType, SubmissionType } from "../models";
import {
    AttachmentService, CommentService,
    CourseService,
    ExerciseService, NotificationService, SubmissionService
} from "../services";
import { serializeSubmissionDetail } from "./../interfaces/submission.interface";
import { ExerciseState } from "./../models/exercise.model";

@injectable()
export class SubmissionController {
    constructor(
        @inject("SubmissionService") private readonly _submissionService: SubmissionService,
        @inject("AttachmentService") private readonly _attachmentService: AttachmentService,
        @inject("CommentService") private readonly _commentService: CommentService,
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService,
        @inject("NotificationService") private readonly _notificationService: NotificationService,
        @inject("CourseService") private readonly _courseService: CourseService
    ) { }

    public getAllSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const exerciseId = +req.params.exerciseId;
            // const courseId = +req.params.courseId;

            const submissionList = await this._submissionService.findAllSubmissionExercise(exerciseId);

            return res.composer.success(serializeSubmissionList(submissionList));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public createNewSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const exerciseId = +req.params.exerciseId;
            const { type, attachmentList } = req.body;

            const newSubmission = await this._submissionService.createSubmission(exerciseId, userId, type);

            const newAttachmentList = await this._attachmentService.createBulkAttachment(
                ReferenceType.SUBMISSION, newSubmission.id, attachmentList
            );

            return res.composer.success(
                serializeSubmissionDetail({ ...newSubmission, attachmentList: newAttachmentList })
            );
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public getSubmissionDetail = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const submissionId = +req.params.submissionId;

            const submission = await this._submissionService.findSubmissionById(submissionId);

            if (!submission) { return res.composer.success(); }
            const attachmentList =
                await this._attachmentService.findAllAttachment(ReferenceType.SUBMISSION, submission.id);

            const commentList =
                await this._commentService.findCommentByRefType(ReferenceType.SUBMISSION, submission.id);

            return res.composer.success(serializeSubmissionDetail({ ...submission, attachmentList, commentList }));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }
    public getSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const exerciseId = +req.params.exerciseId;

            const submission = await this._submissionService.findByUserId(userId, exerciseId);

            if (!submission) { return res.composer.success(); }
            const attachmentList =
                await this._attachmentService.findAllAttachment(ReferenceType.SUBMISSION, submission.id);
            const commentList =
                await this._commentService.findCommentByRefType(ReferenceType.SUBMISSION, submission.id);

            return res.composer.success(serializeSubmissionDetail({ ...submission, attachmentList, commentList }));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public updateSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const submissionId = +req.params.submissionId;
            const body = req.body;

            await this._submissionService.updateSubmission(submissionId, body);

            const submission = await this._submissionService.findSubmissionById(submissionId);

            return res.composer.success(serializeSubmissionDetail(submission));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public updateScore = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const score = +req.body.score;
            const courseId = +req.params.courseId;
            const userId = +req.params.userId;
            const exerciseId = +req.params.exerciseId;
            const exercise = await this._exerciseService.findExerciseById(exerciseId);

            if (!exercise) return res.composer.notFound();

            const submissionExist = await this._submissionService.findByUserId(userId, exerciseId);

            if (!submissionExist) {
                const newSubmission = await this._submissionService.createScoreSubmission(exerciseId, userId, score);

                return res.composer.success(serializeSubmissionDetail(newSubmission));
            }

            await this._submissionService.updateSubmission(submissionExist.id, { score, type: SubmissionType.SCORED });

            const submission = await this._submissionService.findSubmissionById(submissionExist.id);

            if (exercise.state === ExerciseState.COMPLETED) {
                await this._notificationService.createNewNotification(courseId, {
                    content: UpdateScore,
                    refType: NotificationType.COURSE,
                    refId: courseId,
                    uri: `/grade/${courseId}`,
                })
            }

            return res.composer.success(serializeSubmissionDetail(submission));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public reviewGrade = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const submissionId = +req.params.submissionId;
            const courseId = +req.params.courseId;
            const userId = <number> req.currentUser?.id;
            const body = req.body;

            const ownerId = await this._courseService.getOwnerId(courseId);

            if (ownerId === null) return res.composer.notFound();

            const submissionExist = await this._submissionService.findSubmissionById(submissionId);

            if (!submissionExist) return res.composer.notFound();
            if (submissionExist.userId !== userId) return res.composer.forbidden();

            const newComment = await this._commentService.createComment(userId, {
                content: `Điểm mong muốn: ${body.grade}\n Ghi chú: ${body.note}`,
                refType: ReferenceType.SUBMISSION,
                refId: submissionId
            })

            await this._notificationService.createOneNotification({
                content: reviewGradeMessage(`${req.currentUser?.firstName} ${req.currentUser?.lastName}`),
                uri: uriReviewGrade(courseId, submissionExist.exerciseId, userId),
                refType: NotificationType.COURSE,
                refId: courseId,
                userId: ownerId,
                isRead: false,
            })

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}
